// @ts-ignore
import Prism from 'prismjs'
import Blog from '@components/blog'
import Stars from '@components/stars'
import { Code } from '@components/blog/code'
import { Table } from '@components/blog/table'
import { Reference, Bliblio } from '@components/blog/reference'
import { reducedMemoryUsage } from 'src/content/blogs'
import Layout from 'src/layout/page'

const Content = () => {
  createEffect(() => {
    Prism.highlightAll()
  })

  const biblio = new Bliblio();
  const burnReleaseV060 = biblio.addReference(
    'Burn v0.6.0 release notes',
    'https://github.com/burn-rs/burn/releases/tag/v0.6.0',
  );
  const copyOnWrite = biblio.addReference(
    'Wikipedia: Copy-on-write',
    'https://en.wikipedia.org/wiki/Copy-on-write',
  );

  return (
    <Layout>
      <Stars numStars={15} bot={30}/> 
      <Blog 
        props={reducedMemoryUsage} 
        children={
          <div>
            <h2>
              Introduction
            </h2>
            <p>
              The latest release of Burn<Reference references={[burnReleaseV060.ref()]} /> includes significant changes to its memory management strategy.
              One of the most notable changes is that tensor-allocated memory can now be reused way more often.
              This is a big improvement, as every operation was previously implemented using read-only tensor references, which often resulted in unnecessary memory allocation.
              Overall, these changes significantly reduce memory usage, especially on the CPU compared to PyTorch.
            </p>
            <p>
              The new approach motivated a complete rewrite of the auto differentiation engine of Burn, which allows any backend to support backpropagation.
              The previous implementation relied on object-oriented programming patterns, resulting in excessive indirections and memory allocations.
              Moreover, the engine was read-only, limiting its ability to free up unused tensors or reuse them when possible during the backward pass .
              The new implementation addresses these limitations by adopting more efficient rusty patterns, leveraging the updated backend API, and enabling in-place operations.
            </p>
            <h2>
              In-place Operations
            </h2>
            <p>
              How does Burn enable the reuse of tensor-allocated memory?
              One way is through a pattern similar to copy-on-write<Reference references={[copyOnWrite.ref()]} />, where data can only be safely written when there is a single reference pointing to it.
              If there are multiple references, the original data is copied before being written, hence the name copy-on-write. 
              The distinction in how Burn reuses tensor-allocated memory is as follows: instead of copying data when there are multiple references using a tensor, the normal (non in-place) operation is used instead.
              Here's an example of how the log function is implemented using the tch backend (bindings to LibTorch).
            </p>
            <Code 
              lang='rust'
              code={`
  fn log<const D: usize>(tensor: TchTensor<E, D>) -> TchTensor<E, D> {
      tensor.unary_ops(
          // When the tensor is safe to mutate inplace.
          |mut tensor| tensor.log_(),
          // When the tensor is not safe to mutate inplace.
          |tensor| tensor.log(),
      )
  }
  `}
            />
            <p>
              In this example, we call the in-place log function when possible, and the normal function otherwise.
              Note that all functions ending with an underscore are in-place operations with libtorch.
              The unary_ops operation abstracts how the number of references is counted, using Atomic Reference Counting (Arc) provided by the standard library.
              This behavior is also available with the alloc crate when working with no_std, which is useful for environments where there is no operating system available.
              The non-thread-safe variant, Reference Counting (Rc), also provides the same functionality.
              Normally, this pattern should be used with try_unwrap and get_mut functions provided by Arc and Rc, which safely return a mutable or an owned value of the inner type.
              However, the PyTorch bindings are not really safe.
              You can call mutable operations on any tensor handle, even read-only references, by just doing a shallow copy.
              Hence, we track the memory location of each tensor's storage manually instead.
            </p>
            <Code 
              lang='rust'
              code={`
  pub fn unary_ops<FOwn, FRef, EOut: tch::kind::Element, const D_OUT: usize>(
      self,
      fown: FOwn,
      fref: FRef,
  ) -> TchTensor<EOut, D_OUT>
  where
      FOwn: Fn(tch::Tensor) -> tch::Tensor,
      FRef: Fn(&tch::Tensor) -> tch::Tensor,
  {
      // We check if there are multiple tensor pointing the the same storage
      if Arc::strong_count(&self.storage) > 1 {
          // If this is the case, the non-inplace function is called
          return TchTensor::from_existing(fref(&self.tensor), self.storage);
      }
  
      // Only the current tensor is pointing to the provided storage space.
      // Since the tensor will never be reused, we can safely call the owned
      // function, which may dispatch to an inplace operation.
      TchTensor::from_existing(fown(self.tensor), self.storage)
  }
  `} 
            />
            <p>
              This strategy can also be used for binary operations, enabling other kinds of optimizations.
              In some cases, you may call another LibTorch function depending on the number of references pointing to the input tensors, in order to reuse as much tensor-allocated memory as possible.
              Here's an example with the lower implementation.
            </p>
            <Code 
              lang='rust'
              code={`
  pub fn lower<const D: usize>(
      lhs: TchTensor<E, D>,
      rhs: TchTensor<E, D>
  ) -> TchTensor<bool, D> {
      TchTensor::binary_ops_tensor(
          lhs,
          rhs,
          // When the lhs tensor is safe to mutate.
          |lhs, rhs| lhs.less_tensor_(rhs).to_kind(tch::Kind::Bool),
          // When the rhs tensor is safe to mutate, but not lhs.
          |lhs, rhs| rhs.greater_tensor_(lhs).to_kind(tch::Kind::Bool),
          // When both tensor are not safe to mutate
          |lhs, rhs| lhs.less_tensor(rhs),
      )
  }
  `} 
            />
            <p>
              In this case, when it is safe to mutate the left-hand side (LHS) tensor, we call the in-place operation to reuse its data.
              However, when there is at least one other reference to that tensor, it is not safe to mutate.
              In this case, we could still reuse tensor-allocated memory by calling the in-place greater operation on the right-hand side (RHS) tensor instead.
              This produces the same output but is more efficient.
              Note that this assumes that boolean tensors and float tensors can reuse the same memory space, which may depend on the float data type.
            </p>
            <h2>
              Tensor API
            </h2>
            <p>
              Unfortunately, this pattern was previously impossible to integrate with Burn because all operations received references to tensors as arguments and not owned tensors.
              try_unwrap is an owned function since there is no other way to safely return an owned inner value.
              This means that the previous version of Burn would need to clone the Arc before using the try_unwrap function, which would always return an error since there will always be a minimum of 2 references to the tensor.
            </p>
            <p>
              To allow backends to use this pattern, the API has been updated to receive owned tensors as parameters, with some nice quality-of-life improvements as well.
              The consequence is that tensors are cloned exactly the number of times they are reused.
              This makes it easy for users to optimize their code by removing unnecessary cloning when it's not required.
              Note that Clippy (link to Clippy) normally checks for unnecessary cloning but is not perfect.
              You might change the order in which you do your operations to reduce the amount of cloning.
            </p>
            <p>
              Note that there is no API in Burn to call in-place operations on tensors.
              If the backend supports it, every time it is possible, in-place operations will be used.
              This is a major quality-of-life improvement since the places where in-place operations can be used differ between training and inference, but Burn aims to provide the most optimized models for both use cases.
              Let's reuse the log function as an example.
              During inference, a temporary tensor, which is not a model parameter, is used one time with the log operation, which will reuse the tensor-allocated memory since the tensor was never cloned.
              However, during training, the backward step of the log function needs the input tensor to calculate its derivative, so the input tensor is cloned during the forward pass.
              Therefore, the input tensor will be left unchanged during the forward pass but reused during the backward pass.
            </p>
            <h2>
              Autodiff
            </h2>
            <p>
              The method for calculating gradients with Burn was highly inefficient but offered significant flexibility.
              After learning from this, I decided to rewrite that entire part of the framework from scratch.
              Although it seemed like a daunting task at first, I was able to complete it in less than a week without any breaking changes to the API.
              Burn is designed to allow for this type of refactoring and continuous improvement of performance and architecture.
              The primary goal was to reduce unnecessary cloning and memory allocations while simplifying the complex and difficult-to-understand code.
              Additionally, it was important to make it easy to support new operations of any kind, which presented challenges in terms of flexibility, simplicity, and minimizing repetitive code.
              To demonstrate this, consider the implementation of the cosine function.
            </p>
            <Code
              lang="rust"
              code={`
  fn cos<const D: usize>(tensor: ADTensor<B, D>) -> ADTensor<B, D> {
  		// Define a struct for static dispatch
      #[derive(Debug)]
  		struct Cos; 
  
  		impl<B: Backend, const D: usize> Backward<B, D, 1> for Cos {
  				// Define the state to capture during the foward pass
          type State = B::TensorPrimitive<D>; 
  				
  				// Code that is executed during the backward pass
          fn backward(self, ops: Ops<Self::State, 1>, grads: &mut Gradients) {
              let input = ops.state;
  
  						// Calculate the derivative with respect to its parent
              unary::<B, D, D, _>(ops.parents, ops.node, grads, |grad| {
                  let value = B::neg(B::sin(input));
                  B::mul(grad, value)
              });
          }
      }
  		
      // Prepare a statefull operation
      match Cos.prepare([tensor.node], [tensor.graph]).statefull() {
          // This executes when the tensor is tracked.
          OpsKind::Tracked(prep) => {
  						// Finish the preparation capturing the state
  						// The input tensor is cloned for the backward pass
              prep.finish(tensor.primitive.clone(), B::cos(tensor.primitive))
          }
  				// This executes when the tensor is not part of any autodiff graph
  				// The cos operation is called without any cloning
          OpsKind::UnTracked(prep) => prep.finish(B::cos(tensor.primitive)),
      }
  }
`}
            />
            <p>
              The cosine function definition is the same as any backend since gradients are calculated using a backend decorator.
              The implementation uses static dispatch via a zero-sized struct named Cos, which implements the Backward trait.
              During the backward pass, the derivative with respect to the parent node is calculated using the chain rule of differentiation.
              The function supports both tracked and untracked operations, with the former requiring cloning of the input tensor for use in the backward pass.
              However, sometimes operations don't require any state during the backward pass.
              Let's see how it's done with the scalar addition function.
            </p>
            <Code
              lang="rust"
              code={`
  fn add_scalar<const D: usize>(
  		lhs: ADTensor<B, D>,
  		rhs: FloatElem<B>,
  ) -> ADTensor<B, D> {
  		// Define a struct for static dispatch
  		#[derive(Debug)]
  		struct AddScalar;
  
  		impl<B: Backend, const D: usize> Backward<B, D, 1> for AddScalar {
          type State = ();
          
  				// Code that is executed during the backward pass
          fn backward(self, ops: Ops<Self::State, 1>, grads: &mut Gradients) {
              unary::<B, D, D, _>(ops.parents, ops.node, grads, |grad| grad);
          }
      }
  		
  		// Simpler definition where no match are required.
      AddScalar
          .prepare([lhs.node], [lhs.graph])
          .stateless(B::add_scalar(lhs.primitive, rhs))
  }
`}
            />
            <p>
              I won’t go further into more details, but you can easily check other kind of operations on the repositopry (link).
            </p>

            <h2>
              Benchmarks
            </h2>

            <p>
              Even though the last release was focused on structural refactors to allow for more optimizations and control from backend implementations, it's still interesting to see how it compares to other frameworks.
              So let's compare it to PyTorch for simple use cases.
            </p>

            <h3>
              Disclamer
            </h3>

            <p>
              First, it's important to note that Burn doesn't have fused operations, even for popular activation functions like softmax, gelu, sigmoid, etc.
              Additionally, all the derivatives of each primitive operation calculated during the backward pass also use primitive operations and are not fused.
              This is significant in terms of real-world performance, and PyTorch is more likely to be faster for common models, at least on the GPU where operation fusion has a bigger impact.
            </p>

            <p>
              The direction Burn wants to take is probably different from other frameworks.
              It's kind of sad that writing mathematical operations in a more declarative way is less performant than using a high-level function that uses a highly optimized kernel implementation.
              It should be possible to detect that such a kernel exists and use them when possible without requiring the code to be changed.
              This is the kind of developer experience Burn will try to meet: allowing users to write mathematical operations using primitives, and backend developers declaring graphs of operations that can be fused for optimal performance.
              I would also like to allow users to profile their model, see which functions take the most time, and write operation fusion for those functions using their backend of choice, without the need to fork a framework, rewrite the model, or change the programming language.
              All of this while still supporting fully dynamic graphs and custom control flow with an eager-like programming model.
              This is a lot of constraints, so I'll have to think hard about how I can make this happen.
              If you have any comments, suggestions, or recommendations regarding fused operations, I invite you to join the Discord and come talk to us.
            </p>
            <p>
              Now let get into the benchmarks.
            </p>

            <h3>
              Softmax
            </h3>
            <p>
              The first benchmark is a custom implementation of the softmax activation function.
              For numerical stability, we will use an implementation that uses log softmax.
            </p>

            <Code
              lang="rust"
              code={`
  use burn::tensor::{backend::Backend, Tensor};
  
  fn softmax<const D: usize, B: Backend>(tensor: Tensor<B, D>, dim: usize) -> Tensor<B, D> {
      log_softmax(tensor, dim).exp()
  }
  
  fn log_softmax<const D: usize, B: Backend>(tensor: Tensor<B, D>, dim: usize) -> Tensor<B, D> {
      tensor.clone() - tensor.exp().sum_dim(dim).log()
  }
`}
            />
            <p>
              Now, let’s compare it to the equivalent code in PyTorch.
            </p>
            <Code
              lang="python"
              code={`
  import torch
  from torch import Tensor
  
  
  def softmax(tensor: Tensor, dim: int) -> Tensor:
      return log_softmax(tensor, dim).exp()
  
  def log_softmax(tensor: Tensor, dim: int) -> Tensor:
      return tensor - tensor.exp().sum(dim=dim, keepdim=True).log()
`}
            />
            <p>
              The main difference in the code comes from the extra typing in Burn, which specifies the number of dimensions a tensor has and on which backends it runs.
              Note that the notation can be softened by moving the generic argument declaration into a zero-sized struct to group functions that operate on tensors of the same type.
            </p>

            <p>
              The other difference is that we need an explicit clone in the Burn version because the tensor is reused two times.
              During inference, we expect `tensor.clone() - tensor.exp()` to not be in-place operations since they all use the same memory.
              However, we expect all other operations to reuse the same memory, avoiding unnecessary allocations.
            </p>
            <p>
            The tests were performed on my laptop, so they are not fully reliable, but still informative to look at what kind of performance improvement we can expect.
            </p>

            <Table
              title="MLP Experiment"
              description="Note that inference benchmarks were executed 100 times on CPU and 5000 times on GPU, while the autodiff benchmarks were executed 200 times on CPU and 5000 times on GPU."
              columnNames={[
                <div/>,
                <div>
                  <div>Inference</div>
                  <div>Memory</div>
                </div>,
                <div>
                  <div>Inference</div>
                  <div>Speed</div>
                </div>,
                <div>
                  <div>Autodiff</div>
                  <div>Memory</div>
                </div>,
                <div>
                  <div>Autodiff</div>
                  <div>Speed</div>
                </div>
              ]}
              entries={[
                {
                  title: 'PyTorch CPU',
                  values: [
                    <span>433 M</span>,
                    <span>22.765 ms</span>,
                    <span>708 M</span>,
                    <span class="font-bold">76.85 ms</span>,
                  ]
                },
                {
                  title: 'Burn CPU',
                  values: [
                    <span class="font-bold">385 M</span>,
                    <span class="font-bold">22.695 ms</span>,
                    <span class="font-bold">576 M</span>,
                    <span>80.429 ms</span>,
                  ]
                },
                {
                  separator: true,
                },
                {
                  title: 'PyTorch GPU',
                  values: [
                    <span>1190 M</span>,
                    <span>0.8474 s</span>,
                    <span class="font-bold">1204 M</span>,
                    <span>3.2708 s</span>,
                  ]
                },
                {
                  title: 'Burn GPU',
                  values: [
                    <span class="font-bold">1096 M</span>,
                    <span class="font-bold">0.8042 ms</span>,
                    <span>1222 M</span>,
                    <span class="font-bold">2.4874 ms</span>,
                  ]
                }

              ]}
            />

            <h2>
              References
            </h2>
            {biblio.generate()}
          </div>
      }/>
    </Layout >
  )
}

export default Content

