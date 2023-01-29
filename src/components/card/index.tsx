import { Component } from "solid-js"
import { A } from "solid-start"

type Props = {
  links: string
  title: string
}

const Card: Component<Props> = (props) => {
  return (
    <A href={props.links}>
      <div class="p-10 bg-white/5 rounded-lg text-white hover:scale-110 transition-all hover:shadow-lg">
        {props.title}
      </div>
    </A>
  )
}

export default Card
