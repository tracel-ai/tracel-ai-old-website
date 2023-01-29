import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter'
import { unified } from 'unified'
import remarkHtml from 'remark-html'
import { Component } from 'solid-js'

type Props = {
  markdown: string
}

const Blog: Component<Props> = (props) => {
  const [blog, setBlog] = createSignal('')

  createEffect(async () => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml', 'toml'])
      .use(remarkParseFrontmatter)
      .use(remarkHtml)
      .process(props.markdown)

    setBlog(String(file))
  })

  return (
    <div innerHTML={blog()} />
  )

}

export default Blog
