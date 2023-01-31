import Card from '@components/card'
import Layout from 'src/layout/page'

const Blogs = () => {
  return (
    <Layout>
      <div class="mx-20 mt-20">
        <h1 class="text-3xl text-white mb-10">Blog</h1>
        <div class="flex space-x-10">
          <Card links="/blog/lorem" title="Lorem" />
          <Card links="/blog/lorem" title="Lorem" />
          <Card links="/blog/lorem" title="Lorem" />
          <Card links="/blog/lorem" title="Lorem" />
        </div>
      </div>
    </Layout>
  )
}

export default Blogs
