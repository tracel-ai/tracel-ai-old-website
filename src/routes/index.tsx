import Outterlink from '@components/outterlink'

// @ts-ignore
import Prism from 'prismjs'
import '@assets/prism-theme.css'

import logo from '@assets/logo.png'
import burn from '@assets/burn.png'

export default function() {
  const features = [
    {
      icon: <div class="i-mdi-robot-happy" />,
      title: 'Flexible',
      description: 'Intuitive custom neural network modules',
    },
    {
      icon: <div class="i-mdi-crosshairs" />,
      title: 'Accurate',
      description: 'Stateless and thread safe forward pass',
    },
    {
      icon: <div class="i-mdi-fire" />,
      title: 'Blazingly Fast',
      description: 'Fast training with full support for metric, logging and checkpointing',
    },
    {
      icon: <div class="i-mdi-gamepad-circle-outline" />,
      title: 'Multiplatform',
      description: 'Tensor library with autodiff, CPU and GPU support',
    },
    {
      icon: <div class="i-mdi-battery-90" />,
      title: 'Batteries Included',
      description: 'Dataset library with multiple utilities and source',
    },
    {
      icon: <div class="i-mdi-account-group" />,
      title: 'Community Driven',
      description: 'Work with a community of passionate developers',
    },
  ]

  createEffect(() => {
    Prism.highlightAll()

  })

  const examples = [
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

  return (
    <div class="full flex flex-col">
      <nav class="fixed w-full z-50 flex justify-end top-10 right-10 text-gray-50 font-semibold">
        <ul class="flex space-x-12 text-xl">
          <li><Outterlink src="https://github.com/burn-rs/burn">Github</Outterlink></li>
          <li><Outterlink src="https://docs.rs/burn/latest/burn">Docs</Outterlink></li>
        </ul>
      </nav>
      <div class="flex pt-10 justify-center items-center h-[70vh] bg-[#202124]">
        <div class="max-w-[650px]">
          <img src={burn} />
        </div>
        <div class="mb-5 pr-28">
          <h1><img class="w-56" src={logo} /></h1>
          <h2 class="text-red-300 font-bold text-normal w-full text-center">Burn Unstoppable Rusty Neurons</h2>
        </div>
      </div>
      <h2 class="bg-[#202124] w-full text-center py-10"><span class="bg-white p-1 rounded">features</span></h2>
      <div class="grid grid-cols-3 px-36 gap-10 bg-gradient-to-b from-[#202124] to-gray-800">
        <For each={features} children={(feature) => (
          <div class="flex justify-center cursor-default text-gray-300">
            <div class="p-6 flex space-y-5 flex-col items-center w-[200px] text-center hover:bg-gray-50 hover:text-[#202124] hover:shadow-2xl hover:scale-105 rounded-lg transition-all">
              <div class="text-5xl text-[#F34918]">{feature.icon}</div>
              <h3 class="text-2xl font-bold">{feature.title}</h3>
              <p class="text-lg">{
                feature.description
              }</p>
            </div>
          </div>
        )} />
      </div>
      <div class="bg-gray-800">
        <h2 class="w-full text-center py-10 mt-20"><span class="bg-white p-1 rounded">examples</span></h2>
        <div class="px-36 items-center space-y-32">
          <For each={examples} children={(example, i) => (
            <div class={`flex space-x-10 items-center ${i() % 2 === 1 && 'flex-row-reverse'}`}>
              <pre class="border-2 border-gray-900 shadow rounded-lg w-full">
                <code class="language-rust">
                  {example.code}
                </code>
              </pre>
              <div>
                <h3 class="font-black uppercase text-[#F34918] text-4xl">{example.title}</h3>
                <p class="text-gray-50">
                  {example.description}
                </p>
              </div>
            </div>
          )} />
        </div>
      </div>
      <div class="w-full self-end text-4xl bg-gray-800 pt-40 space-y-10">
        <ul class="w-full flex justify-center space-x-4">
          <li><Outterlink src="twitter.com">
            <div class="i-mdi-twitter text-blue-900 hover:text-blue-400 transition-colors" />
          </Outterlink></li>
          <li><Outterlink src="github.com">
            <div class="i-mdi-github hover:text-gray-50 transition-colors" />
          </Outterlink></li>
        </ul>
        <div class="w-full text-center text-gray-400 text-sm">
          built with ❤️ using <u><a href="https://bat.glo.quebec">🦇</a></u>
        </div>
      </div>
    </div>
  )
}
