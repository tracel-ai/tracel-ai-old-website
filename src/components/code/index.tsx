// @ts-ignore
import * as prism from 'prismjs'
import { nanoid } from 'nanoid'
import type { Component } from 'solid-js'

type Props = {
  code: string;
  lang: string;
}

export const Code: Component<Props> = (props) => {
  const id = nanoid();

  onMount(() => {
    const elem = document.getElementById(id);
    prism.highlightElement(elem);
  })

  const lang = `language-${props.lang}`;

  return (
    <div class="pt-t pb-2 w-full max-w-full">
      <pre class="border-2 border-gray-900 shadow rounded-lg w-full max-w-full">
        <code id={id} class={lang}>
          {props.code}
        </code>
      </pre>
    </div>
  )
}
