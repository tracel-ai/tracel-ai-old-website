import { Component } from 'solid-js'
import OutterLink from '@components/outterlink'

type Props = {
  name: string
}

export const Sponsor: Component<Props> = (props) => {
  return (
    <OutterLink src={`https://github.com/${props.name}`}>
      <img
        src={`https://github.com/${props.name}.png`}
        width="128px"
        style="border-radius: 50%;"
        alt={props.name}
      />
    </OutterLink>
  )
}
