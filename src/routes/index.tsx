import launch from '@assets/launch.txt'
import Animation from '@components/animation'
import Outterlink from '@components/outterlink'

// @ts-ignore
import Prism from 'prismjs'
import '@assets/prism-gruvbox-light.css'

import logo from '@assets/logo.png'

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

  return (
    <div class="full flex flex-col">
      <nav class="fixed w-full z-50 flex justify-end top-10 right-10">
        <ul class="flex space-x-12 text-xl">
          <li><Outterlink src="https://github.com/burn-rs/burn" label="GitHub" /></li>
          <li><Outterlink src="https://docs.rs/burn/latest/burn" label="Docs" /></li>
        </ul>
      </nav>
      <div class="flex items-center h-[70vh] bg-[#FFF0DF]">
        <div>
          <Animation src={launch} className="" />
        </div>
        <div class="mb-5">
          <h1><img class="w-56" src={logo} /></h1>
          <h2 class="text-red-300 font-bold text-normal w-full text-center">Burn Unstoppable Rusty Neurons</h2>
        </div>
      </div>
      <h2 class="bg-[#FFF0DF] w-full text-center py-10"><span class="bg-white p-1 rounded">features</span></h2>
      <div class="grid grid-cols-3 px-36 gap-10 bg-gradient-to-b from-[#FFF0DF] to-white">
        <For each={features} children={(feature) => (
          <div class="flex justify-center cursor-default">
            <div class="p-6 flex space-y-5 flex-col items-center w-[200px] text-center hover:bg-white hover:shadow-2xl hover:scale-105 rounded-lg transition-all">
              <div class="text-5xl text-[#F34918]">{feature.icon}</div>
              <h3 class="text-2xl font-bold">{feature.title}</h3>
              <p class="text-lg">{
                feature.description
              }</p>
            </div>
          </div>
        )} />
      </div>
      <h2 class="w-full text-center py-10 mt-20"><span class="bg-white p-1 rounded">examples</span></h2>
      <div class="px-36 items-center space-y-32">
        <div class="flex space-x-10 items-center">
          <pre class="border-2 rounded-lg w-full">
            <code class="language-rust">
              {`
    use burn::tensor::{Tensor, Shape, Data};
    use burn::tensor::backend::{Backend, NdArrayBackend, TchBackend};

    fn my_func<B: Backend>() {
      let _my_tensor = Tensor::<B, 2>::ones(Shape::new([3, 3]));
    }

    fn main() {
      my_func<NdArrayBackend<f32>>();
      my_func<TchBackend<f32>>();
    }
          `}
            </code>
          </pre>
          <div>
            <h3 class="font-bold text-2xl">Tensor</h3>
            <p>
              The Tensor struct is at the core of the burn framework. It takes two generic parameters, the Backend and the number of dimensions D,
            </p>
          </div>
        </div>
        <div class="flex space-x-10 items-center">
          <div>
            <h3 class="font-bold text-2xl">Module</h3>
            <p>
              The Module derive let your create your own neural network module similar to PyTorch.
            </p>
          </div>
          <pre class="border-2 rounded-lg w-full">
            <code class="language-rust">
              {`
    use burn::nn;
    use burn::module::{Param, Module};
    use burn::tensor::backend::Backend;

    #[derive(Module, Debug)]
    struct MyModule<B: Backend> {
      my_param: Param<nn::Linear<B>>,
      repeat: usize,
    }
          `}
            </code>
          </pre>
        </div>
      </div>
      <div class="w-full self-end mt-40 space-y-10">
        <ul class="w-full flex justify-center space-x-4">
          <li><Outterlink src="twitter.com">
            <div class="i-mdi-twitter text-xl"/>
          </Outterlink></li>
          <li><Outterlink src="github.com">
            <div class="i-mdi-github text-xl"/>
          </Outterlink></li>
        </ul>
        <div class="w-full text-center text-gray-400 text-sm">
          built with ❤️ using <u><a href="https://bat.glo.quebec">🦇</a></u>
        </div>
      </div>
    </div>
  )
}
