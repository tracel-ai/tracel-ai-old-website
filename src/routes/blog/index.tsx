import Card from '@components/card'
import Stars from '@context/stars'
import { blogs } from 'src/content/blogs'
import Layout from 'src/layout/page'

const Blogs = () => {
  return (
    <Layout>
      <Stars numStars={10} bot={30}/> 
    <div class="bg-gradient-to-b flex justify-center from-[#202124] to-gray-800">
      <div class="mx-20 mt-20 ">
        <div class="mb-10">
          <h1 class="text-3xl text-white text-center font-bold mb-3">Blog</h1>
          <h2 class="text-xl text-red-300 font-bold text-normal w-full text-center">Where we share ideas</h2>
        </div>
        <div>
          <For each={blogs} children={(blog) => (
            <Card 
              links={blog.links}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              publishedDate={blog.publishedDate}
            />
          )}/>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Blogs
