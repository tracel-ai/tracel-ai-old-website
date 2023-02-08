import { A } from 'solid-start'
import type { Component } from 'solid-js'

type PropsBiblio = {
  index: number;
  name: string;
  link: string;
}

type PropsTextMultiple = {
  references: PropsBiblio[]
}

export const ReferenceText: Component<PropsTextMultiple> = (props) => {
  const text = props.references.map((ref, index) => {
    if (index + 1 === props.references.length) {
      return <a href={`#${refid(ref)}`}>{ref.index}</a>;
    }
    return <a href={`#${refid(ref)}`}>{ref.index},</a>;
  });

  return (
     <span class="reference px-1">[
       {text}
      ]
    </span>
  )
}

const refid = (ref: PropsBiblio) => {
  return `reference-${ref.index}`;
}

export const ReferenceBiblio: Component<PropsBiblio> = (props) => {
  return (
    <div class="pl-4" id={refid(props)}>
      <span class="pr-2">
        [<A class="hover:font-bold text-[#69b8e1]" href={props.link} target="_blank">{props.index}</A>]
      </span>
      {props.name}
    </div>
  )
}
