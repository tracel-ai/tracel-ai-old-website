import Outterlink from '@components/outterlink'

// @ts-ignore
import Prism from 'prismjs'
import '@assets/prism-theme.css'

import logo from '@assets/logo.png'
import burn from '@assets/burn.png'
import { mainFeatures } from 'src/content/features'
import { codeExamples } from 'src/content/examples'

export default function() {
  let ref: HTMLDivElement

  const [isScrolling, setIsScrolling] = createSignal(false)

  createEffect(() => {
    Prism.highlightAll()
  })

  createEffect(() => {
    document.addEventListener('scroll', () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    })
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      setIsScrolling(true)
    }
  })

  return (
    <div ref={ref!} class="full flex flex-col">
      <nav class={`fixed w-full px-10 py-5 z-50 flex items-center text-gray-50 font-semibold transition-colors ${isScrolling() && 'bg-[#F34918] shadow-2xl'}`}>
        <p class="text-3xl">Burn</p>
        <ul class="ml-auto flex space-x-12 text-xl">
          <li><Outterlink src="https://github.com/burn-rs/burn">Github</Outterlink></li>
          <li><Outterlink src="https://docs.rs/burn/latest/burn">Docs</Outterlink></li>
          <li><iframe src="https://ghbtns.com/github-btn.html?user=burn-rs&repo=burn&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe></li>
        </ul>
      </nav>
      <div class="flex pt-4 sm:pt-10 flex-col sm:flex-row justify-center items-center sm:h-[70vh] bg-[#202124]">
        <div class="max-w-[650px]">
          <img src={burn} />
        </div>
        <div class="mb-5 sm:pr-28">
          <h1><img class="w-56" src={logo} /></h1>
          <h2 class="text-red-300 font-bold text-normal w-full text-center">Burn Unstoppable Rusty Neurons</h2>
        </div>
      </div>
      <h2 class="bg-[#202124] w-full text-center py-10"><span class="bg-white p-1 rounded">features</span></h2>
      <div class="grid sm:grid-cols-3 sm:px-36 gap-10 bg-gradient-to-b from-[#202124] to-gray-800">
        <For each={mainFeatures} children={(feature) => (
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
        <div class="sm:px-36 items-center space-y-10 sm:space-y-32">
          <For each={codeExamples} children={(example, i) => (
            <div class={`flex flex-col-reverse p-4 sm:p-0 sm:space-x-10 items-center ${i() % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
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
          <li><Outterlink src="https://twitter.com/nath_simard">
            <div class="i-mdi-twitter text-blue-900 hover:text-blue-400 transition-colors" />
          </Outterlink></li>
          <li><Outterlink src="https://github.com/burn-rs/burn">
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
