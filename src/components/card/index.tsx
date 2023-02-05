import { Component } from 'solid-js'
import { A } from 'solid-start'

type Props = {
  links: string
  title: string
  description: string
  author: string
  publisheDate: string
}

const Card: Component<Props> = (props) => {
  return (
    <A href={props.links}>
      <div class="py-2">
        <div class="flex p-10 bg-white/5 rounded-lg text-white hover:scale-110 transition-all hover:shadow-lg">
          <div class="w-96">
            <div class="font-bold text-lg line-clamp-1">
              <h3>{props.title}</h3>
            </div>
            <p class="h-12 text-m line-clamp-2">
              {props.description}
            </p>
          </div>
          <div class="w-72 flex justify-end">
            <div>
              <div class="flex">
                <div class="h-6 w-6 i-mdi-clipboard-text-clock" />
                <span class="px-4">{props.publisheDate}</span>
              </div>
              <div class="flex">
                <div class="h-6 w-6 i-mdi-account-edit" />
                <span class="px-4">{props.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </A>
  )
}

export default Card
