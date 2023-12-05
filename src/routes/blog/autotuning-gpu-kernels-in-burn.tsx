import Blog from '@components/blog'
import Stars from '@components/stars'
import { Table } from '@components/blog/table'
import { Reference, Biblio } from '@components/blog/reference'
import { autotuningGpuKernelsBurn } from 'src/content/blogs'
import Layout from 'src/layout/page'
import { Code } from '@components/code'

const Content = () => {
  const biblio = new Biblio()

  const mojo_podcast = biblio.addReference(
    'Lex Fridman Podcast: Chris Lattner - Future of Programming and AI',
    'https://www.youtube.com/watch?v=pdJQ8iVTwj8'
  )
  const antares = biblio.addReference('Antares', 'https://antarestech.com')
  const burn_compute_blog = biblio.addReference(
    'Creating High-Performance Asynchronous Backends with Burn-Compute',
    'https://burn.dev/blog/creating-high-performance-asynchronous-backends-with-burn-compute'
  )
  const wgsl = biblio.addReference(
    'WebGPU Shading Language',
    'https://www.w3.org/TR/WGSL/'
  )
  const nvidia_cuda = biblio.addReference(
    'CUDA C Programming Guide',
    'https://docs.nvidia.com/cuda/cuda-c-programming-guide/'
  )
  const divide_and_conquer = biblio.addReference(
    'Diderot: Divide and Conquer',
    'https://www.diderot.one/courses/89/books/351/chapter/4547'
  )
  const matmul_kernel = biblio.addReference(
    'How to Optimize a CUDA Matmul Kernel for cuBLAS-like Performance: a Worklog',
    'https://siboehm.com/articles/22/CUDA-MMM'
  )
  return (
    <Layout>
      <Stars numStars={15} bot={30} />
      <Blog
        props={autotuningGpuKernelsBurn}
        children={
          <div>
            <h2>Introduction</h2>
            <p>
              At the lowest level of abstraction of a deep learning framework
              lie the kernels. <i>Kernel</i> is a fancy word to describe an
              algorithm that accomplishes a task of relative simplicity on a
              tensor and that can be used in a broad range of contexts, like for
              instance a matrix multiplication (referred to as Matmul
              hereafter). These algorithms being the most basic building blocks,
              they often find themselves in the hot loop of an AI model and it's
              primordial that they execute as fast as possible. That is why
              their computation is often delegated to the GPU, which is usually
              faster on highly parallelizable problems like tensor operations,
              provided their excentricities are respected.
            </p>
            <p>
              Indeed, there are many types of GPUs, all with their own cache
              size, number of registers, etc. As a result, some kernel
              implementations may run better on some GPUs than others{' '}
              <Reference references={[mojo_podcast.ref()]} />. Add to that the
              fact that some kernels are better on some tensor shapes, as we
              will see with the Reduction algorithm.
            </p>
            <p>
              Selecting the appropriate kernel for a given task, depending on
              the device and the shape, can quickly become a cumbersome task.
              Hardcoding the choice may pose two significant issues: first, it
              may not scale well in the future, and second, it might be
              inaccurate due to unforeseen factors not taken into consideration.
            </p>
            <p>
              This is why, in Burn, we have chosen to automate the kernel
              selection process so that the best kernel is always selected,
              regardless of the device it runs on, the shape of the input, or
              any other consideration that is relevant for a specific kernel. We
              call this process Autotune.
            </p>
            <p>
              After defining Autotune and explaining how we integrated it in
              Burn, we will look at how it simplifies the kernel selection for
              two common GPU operations: Reduction and Matmul.
            </p>
            <h2>What's Autotune?</h2>
            <p>
              You may recognize the word _autotune_ from the music industry,
              where Autotune was at first a software by Antares{' '}
              <Reference references={[antares.ref()]} /> that can adjust a
              singer's pitch to a precise note in real time. It had such a high
              impact that the word is now often used for any such
              pitch-correcting algorithm. If you have a shaky voice -like me-,
              you will find autotune to be a life saver when singing. In
              computer science, Autotune is also a correcting process happening
              at runtime. Instead of adjusting to a specific voice, it adjusts
              to specific machine -your laptop, for instance. And instead of
              fixing the pitch, it fixes the execution time.
            </p>
            <p>
              It's particularly relevant in deep learning simply because compute
              efficiency is such a big deal in that field, although in theory it
              could be used in any system where high performance is key. To be
              clear, it is not about tuning hyperparameters or anything that can
              change an AI model's accuracy or training convergence. It's only
              about selecting the fastest kernel among kernels that would all
              output the same result anyway.
            </p>
            <p>
              Now, how does it work? It's actually rather simple: the first time
              you encounter an autotunable operation on a specific input when
              running your model on your machine, it will actually launch the
              operation on all kernels that are registered for autotune,
              benchmark their execution time, and keep the fastest one in a
              cache for subsequent calls to that operation in similar settings.
            </p>
            <p>
              As you can guess, any autotuning strategy adds some overhead for
              the first calls, the goal being to save as much time as possible
              in the long run. We've picked a straightforward strategy that is
              guaranteed to adapt directly to any hardware, as being portable is
              one of our main objectives. Also, we want autotune to work with
              automatic kernel fusion, which creates never seen before kernels
              just-in-time for highly specialized task. Tuning by hand is just
              not possible in this dynamic context.
            </p>
            <h2>Autotune in Burn</h2>
            <p>
              In a previous blogpost{' '}
              <Reference references={[burn_compute_blog.ref()]} />, I presented
              Burn-Compute's architecture and I mentioned that autotune was part
              of it. As Burn-Compute is a reusable basis for all of our in-house
              backend, it means that autotune will by default be part of our
              future backends. At the moment, we use it only on our WGPU
              backend, but it will be trivial to enhance our envisaged CUDA
              backend with it.
            </p>
            <p>
              The subtlety of Autotune lies in the key used to cache kernels. If
              it summarizes the setting in which the kernel is needed in a way
              that is too precise, then there will be cache misses. For
              instance, an operation on matrices of shapes <i>231x231</i> or
              <i>233x233</i> has an extremely high probability of being optimal
              with the same kernel, so we should not run benchmarks for both.
              But if we encouter the shape <i>32x1024</i> afterwards, it may
              behave very differently.
            </p>
            <p>
              More subtle yet, if we meet the shape <i>512x512</i> (512 is a
              power of 2, therefore a very "round" number in computer science),
              then maybe some kernel will be very fast; but then on a{' '}
              <i>512x511</i>
              matrix, the same kernel may need to add some padding first to
              transform it into a round <i>512x512</i> matrix with zeros at the
              end of each row. Adding those zeros means shifting all rows, which
              is a very costly operation.
            </p>
            <p>
              This is of course very dependant of the nature of the operation.
              As we will see, the padding problem appears in Matmul but not in
              Reduction. In Burn, we therefore chose to make the key a custom
              trait implementation, customizable for every operation in every
              backend. Here are for instance our keys for the operations we will
              look at in the next sections:
            </p>
            <p>Reduction:</p>
            <Code
              lang="rust"
              code={`
pub struct ReduceAutotuneKey {
    reduce_dim_length: usize, // Dimension on which we reduce (closest power of 2)
    reduce_dim_stride: usize, // Stride of reduce dimension (for data locality)
    others_product: usize,    // Product of all other dimensions (closest power of 2)
}
`}
            />
            <p>Matmul:</p>
            <Code
              lang="rust"
              code={`
pub struct MatmulAutotuneKey {
    round: bool,            // True when all matmul dims are multiples of tile size
    broadcast: bool,        // True when there are differences in inputs batch size
    anchored_m: usize,      // M dimension (closest power of 2)
    anchored_k: usize,      // K dimension (closest power of 2)
    anchored_n: usize,      // N dimension (closest power of 2)
    anchored_batch: usize,  // Number of batches (closest power of 2), topped at 256
}
`}
            />
            <p>
              Since the cache is always local in our current implementation, we
              do not bother keeping the device information in the key.
            </p>
            <p>
              Of note, we do not force autotune to run all benchmarks on the
              actual input for which we request a kernel. Rather, we choose a
              random input on some shape that is representative of the key. For
              instance, we know that the execution time of our Matmul kernels
              always scales linearly with the batch size. If we need to run
              thousands of batches in the model, running autotune on that batch
              size would take way more time than actually necessary, for the
              same information.
            </p>
            <p>
              Also, if for instance all inputs between <i>512x512</i> and
              <i>1024x1024</i> shared the same key, should we run benchmarks on
              <i>1024x1024</i> which would likely take longer, or on{' '}
              <i>512x512</i>
              for shorter autotune time, but at the risk of results being not
              too reliable at the higher end of the interval? We believe a
              representant, such as the median size <i>768x768</i> would be a
              great choice. We haven't yet explored the idea of a median
              representant yet in Burn, but it would certainly be interesting to
              measure how much more precise autotune would become.
            </p>
            <h2>Tensor Operations on GPU</h2>
            <p>
              Remember how I argumented that autotune was a necessity: tensor
              operation kernels, in particular GPU ones, have execution speeds
              which highly depend on the system in use and input tensor shapes.
              In my personal experience, I find the impact of the tensor shape
              to be understandable, but the impact of the device less
              predictable -that's why I'm so happy to leave it in the hands of
              autotune.
            </p>
            <p>
              Using Reduction and Matmul as examples, we will see how GPU
              concepts related to input specifications have an impact on what is
              the right kernel to choose.
            </p>
            <p>
              Since comparing devices is not the objective here, but rather the
              impact of input shape, all benchmarks I will present are run on my
              personal laptop (MacBook Pro's Apple M2 Pro 19-Core integrated
              graphics card, with Metal 3 API), using Burn's WGPU backend.
            </p>
            <h3>Dividing the Workload</h3>
            <p>
              We will look at some fundamental concepts of GPU computing, using
              the WebGPU nomenclature, which differ somewhat from that of CUDA.
              First, the computation is divided into a <i>grid</i>, which is a
              collection of <i>workgroups</i> which are themselves collections
              of <i>invocations</i>.
            </p>
            <img
              class="w-half my-6 border-2 bg-white rounded"
              src="/autotune/grid.svg"
            />
            <p>
              The grid is an arbitrarily long collection of workgroups.
              Typically, if a tensor has <i>n</i> elements and one workgroup is
              able to process <i>m</i> of them, then the grid consists of{' '}
              <i>n/m</i>
              workgroups. The grid's role is to ensure that the whole
              computation is carried, despite the fact that workgroups have
              limited sizes. The grid does not guarantee any order nor
              parallelism between workgroup computations, therefore we must
              consider all workgroups to work in silos.
            </p>
            <p>
              It's _within_ a workgroup that things get interesting. A workgroup
              is a fixed-size collection of invocations, which are essentially
              threads (in Burn we often launch 1024 invocations per workgroup).
              These threads all work at the same time on the GPU and can share
              data through a shared memory which leverages the GPU cache. They
              can also be synchronized with a barrier if needed.
            </p>
            <h3>Important Considerations of GPU Algorithm Design</h3>
            <p>
              When writing a GPU kernel, for instance using the WGSL (Web GPU
              Shading Language) <Reference references={[wgsl.ref()]} /> as we do
              in our WGPU backend, you write only the code for one invocation.
              By using its <i>workgroup id</i> in the grid and{' '}
              <i>invocation id</i> in the workgroup, you can compute what
              specific tensor input and output elements this invocation should
              be working on.
            </p>
            <p>
              Some important GPU concepts can have a high impact on the
              execution speed in different settings:
            </p>
            <ul class="list-disc px-8 text-xl pb-8">
              <li>
                The <i>shared memory</i> allows for communication across
                threads, but not across workgroups. Therefore, if some elements
                of the input tensor must interact together, they should be
                managed by the same workgroup. This memory is also closer than
                the global memory where the input lies, so if a value must be
                fetched several times (by different threads of the same
                workgroup), it's probably worth saving it in shared memory.
              </li>
              <li>
                One must _avoid concurrency errors_, both across invocations of
                a workgroup and across the grid, when writing results. While
                CUDA offers atomic write primitives{' '}
                <Reference references={[nvidia_cuda.ref()]} /> which forbids two
                threads to add to a value at the same time, Web GPU does not
                afford us with this luxury, making it more complicated for
                threads to collaborate on the same output cells.
              </li>
              <li>
                <i>Memory coalescing</i> is something that can happen in GPUs,
                which I personally find magical: if several threads of adjacent
                IDs access the memory in adjacent spaces at the same time, the
                GPU can perform a single memory reading transaction for all of
                them. When writing GPU kernels, maximizing memory coalescing
                should be a goal. However, verifying its occurrence can be
                subtle, and it is precisely the type of aspect that can vary
                across different devices.
              </li>
              <li>
                Somewhat related to that is the concept of{' '}
                <i>branch divergence</i>, which must be minimized. Branch
                divergence occurs when threads within a workgroup do not take
                the same path in the code, usually because of an _if_ statement.
                The best example I can give is the one I mentioned earlier when
                I said a kernel can be very good on <i>512x512</i> shapes but
                poor on <i>512x511</i>. Suppose we have 64 threads working in
                parallel. If they operate in the middle of the matrix, there is
                no issue. However, when positioned on the edge, in the rounded
                case, the 64 threads will operate on indices 448 to 511, whereas
                in the truncated shape, they should cover indices 448 to 510 (a
                total of 63 values). The 64th thread can either: do a
                computation anyway on the data that follows, which will very
                likely lead to corrupted data, or go through an if to <i>not</i>{' '}
                do the computations like the others. This typically breaks all
                hopes for good vectorization within that workgroup, and threads
                have to wait for each other to be synchronized again. This is
                why it may be best to pad the 511 elements row with a zero to
                reach a round number and avoid the need for if statements.
              </li>
            </ul>
            <h2>Reduction</h2>
            <p>
              In the textbook 1-dimensional case, reducing means computing one
              value from a whole vector, leveraging the associativity of an
              underlying binary operation. Many variations exist (sum, product,
              maximum, etc.) but often share the same algorithmic structures.
              For instance, [12, 3, 5, 4, 15, 2] can be reduced to 41 in the sum
              case, or to 15 for the maximum. Many different strategies exist,
              some with a simple for loop on all values, and some that use
              recursivity to leverage parallelism in a divide-and-conquer
              fashion <Reference references={[divide_and_conquer.ref()]} />.
            </p>
            <p>
              In the N-dimensional case, we typically reduce one dimension,
              going for instance from a <i>MxKxN</i> tensor to a <i>1xKxN</i>{' '}
              one when the reduce dimension is 0. In that case, we reduce M
              values together, KxN times. We will call the M values that must be
              reduced together a <i>reduce column</i>.
            </p>
            <img
              class="w-half my-6 border-2 bg-white rounded"
              src="/autotune/reduce_explained.svg"
            />
            <p>
              What is important here is that in the 0th dimension, the M values
              of a reduce column fundamentally need to interact together.
              Therefore, those values cannot be spread across different
              workgroups, since they would not be able to share information. On
              the other hand, each of the KxN reduce columns can be treated
              totally independantly from one another.
            </p>
            <h3>One Invocation per Reduce Column</h3>
            <p>
              Our first reduce kernel always gives the responsibility of
              computing a whole reduce column to only one _invocation_, which
              only executes a for loop on the whole reduce column. This may be a
              lot of computing for one thread when M is large, but this
              maximizes parallelization across the threads, who can all work in
              a well-vectorized way. Also, there is no risk of concurrency error
              as each output value is managed by only one thread.
            </p>
            <img
              class="w-half my-6 border-2 bg-white rounded"
              src="/autotune/reduce_invocation.svg"
            />
            <h3>One Workgroup per Reduce Column</h3>
            <p>
              Our second reduce kernel rather gives the responsability of a
              reduce column to one <i>workgroup</i>. For large M, threads can
              work together through the shared memory to compute one reduce
              column much more quickly.
            </p>
            <img
              class="w-half my-6 border-2 bg-white rounded"
              src="/autotune/reduce_workgroup.svg"
            />
            <p>There are however two caveats:</p>
            <ul class="list-disc px-8 text-xl pb-8">
              <li>
                If the other dimensions are large, the grid must consist of a
                lot of workgroups. Launching many workgroups is much slower than
                launching many threads.
              </li>
              <li>
                When computing a reduce column, threads can use a
                divide-and-conquer method. However, as the column gets reduced,
                more and more threads become idle, likely causing branch
                divergence.
              </li>
            </ul>
            <h3>Autotuning Reduction</h3>
            <p>Let's see what autotune says about it:</p>
            <p>TODO</p>

            <h2>Matmul</h2>
            <p>
              The point here is not to explain matrix multiplication in detail
              but to understand its complexity with regards to its inputs. On
              2-dimensional input tensors (which are simply matrices), the
              result of a matrix A of size <i>MxN</i> times a matrix B of size
              <i>KxN</i> is an <i>MxN</i> output matrix C. In C, all values are
              the sum of K multiplications of an element of A with an element of
              B. On N-dimensional tensors, all other dimensions than the last
              two are simply batch dimensions, which can be seen as other
              unrelated instances of the kernel. For that reason, we will assume
              2-dimensional tensors in the following explanations.
            </p>
            <img
              class="w-half my-6 border-2 bg-white rounded"
              src="/autotune/matmul.svg"
            />
            <p>
              The computation of one output element depends on many elements of
              the inputs, making it impossible to make several threads work on a
              single output element without just repeating work. For that
              reason, all our kernels have each thread responsible of one output
              element (contrarily to our second reduce kernel).
            </p>
            <p>
              Since all the pair-wise multiplications (one specific element of A
              with one element of B) are uniquely used - we cannot hope to reuse
              intermediate computation results several times. Therefore the
              algorithm must necessarily take at least{' '}
              <i>(size of C)xK =MxNxK</i>
              computation steps.
            </p>
            <h2>Naive Approach (with Memory Coalescing)</h2>
            <p>
              The naive approach simply consists in launching one invocation per
              output element. Then, each thread iteratively reads values from a
              row of A and from a column of B. The secret ingredient of this
              kernel is memory coalescing. Conceptually, if threads of the same
              workgroup with ids 0, 1, 2 and 3 read from memory cells i, i+1,
              i+2, i+3 at the same time, these read operations can be done all
              at once. Repeat this pattern everywhere and you get a pretty
              efficient kernel, considering its simplicity.
            </p>
            <p>
              However, this approach does not use the GPU cache intelligently.
            </p>
            <h3>Padded Tiling 2D Approach</h3>
            <p>
              The tiling approach is all about saving time through the use of
              shared memory, which normally lies in the GPU cache and is way
              faster to access than the inputs. Like mentioned earlier, all
              pair-wise multiplications are unique, but a single element of A
              (or B) is used by many threads, many of which in the same
              workgroup. We can leverage this.
            </p>
            <p>
              In the tiling 2D kernel, we divide both input matrices into
              fixed-size tiles, and we also prepare one tile-size shared memory
              per input. Working in synchronization with other invocations from
              its workgroup, a thread first contributes to fill the shared
              memory with the current input tile, then achieves all the partial
              computations needed for the output element it is responsible of,
              helping itself to values in the shared memory that have been
              loaded by his sibling threads. Then the process is repeated for
              all the tiles along the inner product dimension, to complete the
              computation of the output value.
            </p>
            <p>
              I'm leaving out a lot of details as this gets very technical; more
              details and schemas can be found in{' '}
              <Reference references={[matmul_kernel.ref()]} />. The important
              thing to realize is that we add steps for loading values from the
              global memory to the GPU cache, relying on thread synchronization
              within a workgroup, in order to gain some data locality when
              performing the actual additions and multiplications.
            </p>
            <p>
              As I said, the tiles have fixed sizes, which are configurable, but
              the optimal number depends on the GPU architecture. Let's say we
              fix it to 64. Then any input size that is not a multiple of 64
              will cause problems, because the last threads in the last tile may
              wrongly read from the row after theirs.
            </p>
            <p>
              Hence the need for padding. If the last threads just read zeros
              instead of the values of the following row, they can do their
              computation like the other threads but with a value of zero, which
              will benignly add zero to the output.
            </p>
            <h3>Unpadded Tiling 2D Approach</h3>
            <p>
              Padding can be extremely costly because it changes the data
              layout: A new tensor allocation must occur where all rows must be
              shifted in order to insert zeros in between. In the following
              picture, we get from a <i>3x3</i> tensor to a <i>4x4</i> one while
              keeping contiguousness. Then, after the Matmul, the shifting must
              be undone to retrieve the original output shape.
            </p>
            <img
              class="w-half my-6 border-2 bg-white rounded"
              src="/autotune/offset.svg"
            />
            <p>
              Couldn't we just prevent threads that are out of bound to do any
              computation, using an <code>if</code> statement? In a GPU kernel,
              it would not necessarily be the fastest way because an{' '}
              <code>if</code> will almost certainly create branch divergence.
              Still, that's what we do in our unpadded version of the tiling 2D
              algorithm. To be more precise, the conditional statement is at the
              stage where we load data to the shared memory, so that the{' '}
              <code>if</code> is only for reading and writing to global memory,
              while all computations operate without branching.
            </p>
            <h3>Autotuning Matmul</h3>
            <p>
              Now let's see what benchmarks have to say about which kernel is
              the best.
            </p>
            <p>TODO</p>
            <h2>Conclusion</h2>
            <p>
              In theory, it would be feasible to design an algorithm that
              chooses the right kernel as a function of the input size. However,
              the speed of a kernel for all input sizes can be hard to predict.
              Furthermore, some kernels are parameterizable, which means there
              are actually much more than two or three versions of an operation.
              But most of all, the GPU device on which the kernel runs adds many
              uncertainties: when run on some new device, what will be the GPU
              cache size? Will specialized accelerators be available? How many
              cores will work in parallel? How will memory coalescing actually
              occur?
            </p>
            <p>
              Selecting the right kernel for an extensive AI model computation
              is an important decision that can save so much compute. But a
              perfect algorithm that answers the right thing on all machines
              would be too complex to be handcrafted. Autotune allows to write
              new kernels for specific scenarios without minding about the
              logistics of running that kernel.
            </p>
            <p>
              One may worry about the induced overhead of running all kernels at
              the beginning. For applications where cold start is crucial, for
              instance in cloud applications where new instances spawn very
              often on the same machine to do similar jobs, our autotune
              mechanism will rely on cached, pre-computed benchmarks.
            </p>
            <h2>References</h2>
            {biblio.generate()}
          </div>
        }
      />
    </Layout>
  )
}

export default Content
