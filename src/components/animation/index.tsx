import type { Component } from 'solid-js'

type Props = {
  src: string
  className?: string
}

const Animation: Component<Props> = (props) => {
  return (
    <lottie-player
      class={props.className}
      autoplay
      loop
      src={props.src}
      speed={0.75}
    />
  )
} 

export {
  Animation as default,
}
