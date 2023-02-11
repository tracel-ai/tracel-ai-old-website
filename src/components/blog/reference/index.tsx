import { A } from 'solid-start'
import type { Component, JSXElement } from 'solid-js'

type PropsReference = {
  index: number;
  name: string;
  link: string;
}

type PropsTextMultiple = {
  references: PropsReference[]
}

export const Reference: Component<PropsTextMultiple> = (props) => {
  const text = props.references.map((ref, index) => {
    let displayedText = `${ref.index}`;
    if (index + 1 !== props.references.length) {
      displayedText = `${displayedText},`;
    }

    return (
      <a
        class="hover:text-[#69b8e1]"
        href={`#${refid(ref)}`}
      >
        {displayedText}
      </a>
    );
  });

  return (
     <span class="reference px-1">[
       {text}
      ]
    </span>
  )
}

export class Bliblio {
  private indexes: number;
  private references: BiblioRef[];

  constructor() {
    this.indexes = 0;
    this.references = [];
  }

  inc(): number {
    this.indexes += 1;
    return this.indexes;
  }

  public addReference(name: string, link: string): BiblioRef {
    const reference = new BiblioRef(this, name, link);
    this.references.push(reference);
    return reference;
  }

  public generate(): JSXElement {
    const references = this.references.map(ref => ref.ref());
    references.sort((a, b) => a.index - b.index);

    return (
      <div>
        <For each={references} children={(reference) => (
          <BiblioEntry {...reference} />
        )}/>
      </div>
    );
  }
}

class BiblioRef {
  private index?: number;
  private bliblio: Bliblio;
  private name: string;
  private link: string;

  constructor(bliblio: Bliblio, name: string, link: string) {
    this.bliblio = bliblio;
    this.name = name;
    this.link = link;
  }

  public ref(): PropsReference {
    if (!this.index) {
      this.index = this.bliblio.inc()
    }

    return {
      index: this.index,
      name: this.name,
      link: this.link,
    };
  }
}

const refid = (ref: PropsReference) => {
  return `reference-${ref.index}`;
}

const BiblioEntry: Component<PropsReference> = (props) => {
  return (
    <div id={refid(props)}>
      <span class="pr-2">
        [<A class="hover:font-bold text-[#69b8e1]" href={props.link} target="_blank">{props.index}</A>]
      </span>
      {props.name}
    </div>
  )
}
