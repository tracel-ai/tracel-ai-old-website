import Outterlink from '@components/outterlink'

// @ts-ignore
import Prism from 'prismjs'
import '@assets/prism-theme.css'

import { Motion } from '@motionone/solid'
import logo from '@assets/logo.png'
import burn from '@assets/burn.png'
import { mainFeatures } from 'src/content/features'
import { codeExamples } from 'src/content/examples'
import { footer } from 'src/content/footer'

export default function() {
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

  onMount(() => {
    for (let i = 0; i < 30; i++) {
      const star = document.getElementById('star-' + i)!
      star.style.left = Math.random() * 100 + '%'
      star.style.top = Math.random() * 100 + '%'
      const size = Math.random() * 8
      star.style.width = 1 + size + 'px'
      star.style.height = 1 + size + 'px'
    }
  })

  return (
    <div class="bg-gray-800 w-full flex flex-col">
      <nav class={`fixed w-full px-10 py-5 z-50 flex items-center text-gray-50 font-semibold transition-colors ${isScrolling() && 'bg-[#F34918] shadow-2xl'}`}>
        <p class="text-3xl">Burn</p>
        <ul class="ml-auto flex space-x-12 text-xl">
          <li><Outterlink src="https://github.com/burn-rs/burn">Github</Outterlink></li>
          <li><Outterlink src="https://docs.rs/burn/latest/burn">Docs</Outterlink></li>
          <li class="hidden sm:block"><iframe src="https://ghbtns.com/github-btn.html?user=burn-rs&repo=burn&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe></li>
        </ul>
      </nav>
      <For each={Array.from({ length: 30 })} children={(_, i) => (
        <div id={`star-${i()}`} class="absolute bg-[#EBC65D] rounded-full" />
      )} />
      <div class="flex pt-4 sm:pt-10 flex-col sm:flex-row justify-center items-center sm:h-[70vh] bg-[#202124]">
        <div class="max-w-[650px]">
          <img src={burn} />
        </div>
        <div class="mb-5 sm:pr-28">
          <h1><img class="w-56" src={logo} /></h1>
          <h2 class="text-red-300 font-bold text-normal w-full text-center">Burn Unstoppable Rusty Neurons</h2>
        </div>
      </div>
      <h2 class="bg-[#202124] w-full text-center py-10"></h2>
      <div class="bg-gradient-to-b flex justify-center from-[#202124] to-gray-800">
        <div class="grid sm:grid-cols-3 sm:gap-32">
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
      </div>
      <div class="bg-gray-800 flex justify-center items-center flex-col">
        <h2 class="w-full text-center py-10 pt-20"><span class="font-black uppercase text-[#d1d5db] p-1 text-5xl">Code Snippets</span></h2>
        <div class="max-w-7xl justify-center items-center space-y-10 sm:space-y-32 pb-14 border-b-2 border-gray-900">
          <For each={codeExamples} children={(example, i) => (
            <Motion.div
              initial={{ opacity: 0, x: (i() % 2 === 0 ? 1 : -1) * 20 }}
              inView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              class={`flex flex-col-reverse p-4 sm:p-0 sm:space-x-10 items-center ${i() % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
            >
              <pre class="border-2 border-gray-900 shadow rounded-lg w-80 md:w-full">
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
            </Motion.div>
          )} />
        </div>
      </div>
      <div class="flex justify-center pt-10 pb-10">
        <div class="grid md:grid-cols-3 gap-x-16 gap-y-6 md:gap-x-60 bg-gray-800 text-gray-500">
          <For each={Object.entries(footer)} children={([key, section]) => (
            <ul class="space-y-2">
              <h3 class="uppercase mb-2 font-bold">{key}</h3>
              <For each={section} children={(item) => (
                <li><Outterlink src={item.href}>
                  <div class="flex items-center">
                    {item.icon! && <div class={`${item.iconSize! ? item.iconSize : 'text-xl'} ${item.icon} mr-2`} />}
                    {item.label}
                  </div>
                </Outterlink></li>
              )} />
            </ul>
          )} />
        </div>
      </div>
    </div>
  )
}
