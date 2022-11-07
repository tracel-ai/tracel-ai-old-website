import launch from '@assets/launch.txt'
import Animation from '@components/animation'

export default function() {
  return (
    <div class="full bg-gradient-to-br from-[#001540] to-[#00316E]">
      <Animation src={launch} className="h-5/6" />
      <div class="mb-5">
        <h1 class="uppercase font-black text-8xl w-full text-center text-white">Burn</h1>
        <h2 class="text-red-300 font-bold text-normal w-full text-center">Burn Unstoppable Rusty Neurons</h2>
      </div>
      <p class="w-full text-red-500 text-center">Coming Soon TRADEMARK</p>
    </div>
  )
}
