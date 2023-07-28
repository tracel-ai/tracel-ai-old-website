import Card from '@components/card'
import Stars from '@components/stars'
import { blogs } from 'src/content/blogs'
import Layout from 'src/layout/page'

const Blogs = () => {
  return (
    <Layout>
      <Stars numStars={10} bot={30}/> 
      <div class="bg-gradient-to-b flex sm:justify-center from-[#202124] to-gray-800">
        <div class="sm:mx-20 mt-20 w-full">
          <div class="mb-10 w-full text-center">
            <h1 class="text-3xl text-white font-bold mb-3 w-full text-center">Blog</h1>
            <h2 class="text-xl text-red-300 font-bold text-normal w-full text-center">Where we share ideas</h2>
          </div>
          <div class="mx-5 sm:mx-0 flex flex-col items-center">
            <For each={blogs.reverse()} children={(blog) => (
              <Card {...blog} />
            )}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blogs
