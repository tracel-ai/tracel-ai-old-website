export const codeExamples = [
  {
    code:
      `
  use burn::tensor::backend::Backend;
  use burn::tensor::{Distribution, Tensor};
  use burn_ndarray::NdArrayBackend;
  use burn_tch::TchBackend;

  fn simple_function<B: Backend>() -> Tensor<B, 2> {
      let x = Tensor::<B, 2>::random([3, 3], Distribution::Standard);
      let y = Tensor::<B, 2>::random([3, 3], Distribution::Standard);

      x.matmul(y)
  }

  fn main() {
      let z = simple_function::<NdArrayBackend<f32>>();
      let z = simple_function::<TchBackend<f32>>();
  }
`,
    description: 'The tensor struct is a fundamental aspect of the Burn framework. It allows for the development of deep learning models without the need to specify a backend implementation.',
    title: 'Tensor',
  },
  {
    code:
      `
  use burn::tensor::backend::ADBackend;
  use burn::tensor::{Distribution, Tensor};
  use burn_autodiff::ADBackendDecorator;

  fn simple_function_grads<B: ADBackend>() -> B::Gradients {
      let z = simple_function::<B>();

      z.backward()
  }

  fn main() {
      type ADNdArrayBackend = ADBackendDecorator<NdArrayBackend<f32>>;
      type ADTchBackend = ADBackendDecorator<TchBackend<f32>>;

      let grads = simple_function_grads::<ADNdArrayBackend>();
      let grads = simple_function_grads::<ADTchBackend>();
  }
`,
    description: 'Burn makes backpropagation easy, enabling it on any backend through the use of a simple decorator, making the computation of gradients effortless across different backends.',
    title: 'Autodiff',
  },

  {
    code:
      `
  use burn::nn;
  use burn::module::{Module, Param};
 
  #[derive(Module, Debug)]
  pub struct MultiHeadAttention<B: Backend> {
      query: nn::Linear<B>,
      key: nn::Linear<B>,
      value: nn::Linear<B>,
      output: nn::Linear<B>,
      dropout: nn::Dropout,
      activation: nn::GELU,
      n_heads: usize,
      d_k: usize,
      min_float: f64,
  }
`,
    description: 'The module derive let your create your own neural network module similar to PyTorch',
    title: 'Module',
  },
  {
      code:
`
  use burn::config::Config;
  
  #[derive(Config)]
  pub struct PositionWiseFeedForwardConfig {
      pub d_model: usize,
      pub d_ff: usize,
      #[config(default = 0.1)]
      pub dropout: f64,
  }
`,
    description: 'The config derive simplifies the management of module and component configurations and hyper-parameters, providing a serializable and deserializable structure for efficient deep learning model development.',
    title: 'Config',
  },
]
