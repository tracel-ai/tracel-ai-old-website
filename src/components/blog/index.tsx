import { Meta } from 'solid-start'
import { BlogMetadata } from 'src/content/blogs'
import { Component, JSX } from 'solid-js'

const Blog: Component<{props: BlogMetadata, children: JSX.Element}> = ({props, children}) => {
  let link = props.link;
  if (props.link[0] == '/') {
    link = props.link.slice(1);
  }

  let current = ''
  const paths = link.split('/').map(value => {
    current = current + `/${value}`;
    return {
      href: current,
      name: value,
    };
  });

  return (
    <div class="pt-20 bg-gradient-to-b from-[#202124] to-gray-800">
      <div class="max-w-5xl mb-10 mx-3">
        <Meta property='og:type' content='article' />
        <Meta property='og:title' content={props.title} />
        <Meta property='og:description' content={props.description} />
        <Meta property='og:author' content={props.author} />
        <Meta property='og:image' content={props.imageUrl} />
        <Meta property='article:published_time' content={new Date(props.publishedDate).toISOString()} />
        <div class="mb-3">
          <p class="text-white font-bold text-xl px-2">
            <a href="/" class="hover:text-[#edc567]">burn</a>

            <For each={paths} children={(path) => (
              <span>
                <span>{' · '}</span>
                <a href={path.href} class="hover:text-[#edc567]">{path.name}</a>
              </span>
            )} />
          </p>
        </div>
        <article class="blog rounded-lg bg-white/5 pt-4">
          <div>
            <h1 class="px-3 sm:px-8">
              {props.title}
            </h1>
            <div class="px-3 pb-4 sm:px-8">
              <img
                class="h-48 w-full rounded-lg mr-3 object-cover object-top"
                src={props.imageUrl}
                alt={props.imageUrlAlt}
              />
            </div>
            <div class="flex px-3 sm:px-8">
              <div class="flex">
                <div class="h-5 w-5 i-mdi-clipboard-text-clock" />
                <span class="px-2">{new Date(props.publishedDate).toDateString()}</span>
              </div>
              <a class="pl-2 flex" href={props.authorLink} target="_blank">
                <div class="h-5 w-5 i-mdi-account-edit" />
                <span class="px-2">{props.author}</span>
              </a>
            </div>
          </div>
          <div class="pb-4 px-3 sm:px-8">
            <div class="border-t-2 border-gray-900 my-6" />
            { children }
          </div>
        </article>
      </div>
    </div>
  )
}

export default Blog
