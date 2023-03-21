// @ts-ignore
import Prism from 'prismjs'
import type { Component } from 'solid-js'

type Props = {
  code: string;
  lang: string;
}

export const Code: Component<Props> = (props) => {
  createEffect(() => {
    Prism.highlightAll()
  })
  const lang = `language-${props.lang}`;

  return (
    <div class="pt-t pb-2">
      <pre class="border-2 border-gray-900 shadow rounded-lg w-80 md:w-full">
        <code class={lang}>
          {props.code}
        </code>
      </pre>
    </div>
  )
}
