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

  const file = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkParseFrontmatter)
    .use(remarkHtml)
    .processSync(props.markdown)

  setBlog(String(file))

  return (
    <div innerHTML={blog()} />
  )

}

export default Blog
