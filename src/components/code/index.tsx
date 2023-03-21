// @ts-ignore
import * as prism from 'prismjs'
import { nanoid } from 'nanoid'
import type { Component } from 'solid-js'

type Props = {
  code: string;
  lang: string;
  class?: string;
}

export const Code: Component<Props> = (props) => {
  const id = nanoid();

  onMount(() => {
    const elem = document.getElementById(id);
    prism.highlightElement(elem);
  })

  const lang = `language-${props.lang}`;
  let classes = 'py-2';

  if (props.class) {
    classes = `${classes} ${props.class}`;
  }

  return (
    <div class={classes}>
      <pre class="border-2 border-gray-900 shadow rounded-lg w-full max-w-full">
        <code id={id} class={lang}>
          {props.code}
        </code>
      </pre>
    </div>
  )
}

