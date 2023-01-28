import Layout from 'src/layout/page'

import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter'
import { useParams } from 'solid-start'
import { unified } from 'unified'
import remarkHtml from 'remark-html'


const Blog = () => {
  const [blog, setBlog] = createSignal('')
  createEffect(async () => {
    const params = useParams()

    const response = await import('../../content/blog/' + params.id).then(m => m.default)

    const file = unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml', 'toml'])
      .use(remarkParseFrontmatter)
      .use(remarkHtml)
      .processSync(response)
    setBlog(String(file))
    console.log(file.data.frontmatter)
  })

  return (
    <Layout>
      <div
        class="blog"
      >
        <div innerHTML={blog()} />
      </div>

    </Layout>
  )
}

export default Blog
