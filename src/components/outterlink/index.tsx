import type { FlowComponent } from 'solid-js'

type Props = {
  src: string
  className?: string
  label?: string | Element
}

const OutterLink: FlowComponent<Props> = (props) => {
  return (
    <a target="_blank" rel="noreferrer" href={props.src} class={props.className}>
      {props.children}
    </a>
  )
}

export {
  OutterLink as default,
}
