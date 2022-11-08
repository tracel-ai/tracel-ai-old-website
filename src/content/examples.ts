export const codeExamples = [
  {
    code:
      `
    use burn::tensor::{Tensor, Shape, Data};
    use burn::tensor::backend::{Backend, NdArrayBackend, TchBackend};

    fn my_func<B: Backend>() {
      let _my_tensor = Tensor::<B, 2>::ones(Shape::new([3, 3]));
    }

    fn main() {
      my_func<NdArrayBackend<f32>>();
      my_func<TchBackend<f32>>();
    }

`,
    description: 'The Tensor struct is at the core of the burn framework. It takes two generic parameters, the Backend and the number of dimensions D',
    title: 'Tensor',
  },
  {
    code:
      `
    use burn::nn;
    use burn::module::{Param, Module};
    use burn::tensor::backend::Backend;

    #[derive(Module, Debug)]
    struct MyModule<B: Backend> {
      my_param: Param<nn::Linear<B>>,
      repeat: usize,
    }

`,
    description: 'The Module derive let your create your own neural network module similar to PyTorch',
    title: 'Module',
  }
]
