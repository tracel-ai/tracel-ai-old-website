import { Component } from 'solid-js'

type Props = {
  numStars: number;
  bot?: number;
}

const Stars: Component<Props> = (props) => {
  onMount(() => {
    let bot = props.bot;
    if (!bot) {
        bot = 100;
    }

    for (let i = 0; i < props.numStars; i++) {
      const star = document.getElementById('star-' + i)!
      star.style.left = Math.random() * 100 + '%'
      star.style.top = Math.random() * bot + '%'
      const size = Math.random() * 8
      star.style.width = 1 + size + 'px'
      star.style.height = 1 + size + 'px'
    }
  })

  return (
      <For each={Array.from({ length: props.numStars })} children={(_, i) => (
        <div id={`star-${i()}`} class="absolute bg-[#EBC65D] rounded-full" />
      )} />
  )
}

export default Stars
