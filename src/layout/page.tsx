import type { FlowComponent } from 'solid-js'
import Outterlink from '@components/outterlink'
import { footer } from 'src/content/footer'
import { A } from 'solid-start'

type Props = {}

const Layout: FlowComponent<Props> = (props) => {
  const [isScrolling, setIsScrolling] = createSignal(false)

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
    <div class="bg-gray-800 min-h-[100vh] w-full flex flex-col">
      <nav class={`fixed w-full px-10 py-5 z-50 flex items-center text-gray-50 font-semibold transition-colors ${isScrolling() && 'bg-[#F34918] shadow-2xl'}`}>
        <a href="/" class="text-3xl">Burn</a>
        <ul class="ml-auto flex space-x-12 text-xl">
          <li><Outterlink className="text-white hover:text-[#F34918] transition-colors" src="https://github.com/burn-rs/burn">Github</Outterlink></li>
          <li><A class="text-white hover:text-[#F34918] transition-colors" href="/blog">Blog</A></li>
          <li><Outterlink className="text-white hover:text-[#F34918] transition-colors" src="https://docs.rs/burn/latest/burn">Docs</Outterlink></li>
          <li class="hidden sm:block"><iframe src="https://ghbtns.com/github-btn.html?user=burn-rs&repo=burn&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe></li>
        </ul>
      </nav>
      {props.children}
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

export default Layout