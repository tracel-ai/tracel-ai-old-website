import Layout from 'src/layout/page'

import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter'
import { createRouteData, RouteDataArgs, useRouteData } from 'solid-start'
import { unified } from 'unified'
import remarkHtml from 'remark-html'

export function routeData({ params }: RouteDataArgs) {
  return createRouteData(async () => {
    try {
      const url = new URL('https://burn-rs.github.io/content/blog/' + params.id + '.txt')
      const response = await fetch(url.toString())
      const markdown = await response.text()

      const file = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .use(remarkParseFrontmatter)
        .use(remarkHtml)
        .process(markdown)

      return {
        meta: file.data.frontmatter,
        value: String(file),
      }
    } catch (e) {
      console.error(e)

      return {
        value: 404
      }
    }
  })
}

const Blog = () => {
  const blog = useRouteData<typeof routeData>()

  return (
    <Layout>
      <div
        class="blog"
      >
        <Suspense>
          <div innerHTML={blog()?.value} />
        </Suspense>
        <Suspense>
          <Show when={blog()?.meta?.author}>
            <h2>{blog()?.meta?.author}</h2>
          </Show>
        </Suspense>
      </div >

    </Layout >
  )
}

export default Blog
