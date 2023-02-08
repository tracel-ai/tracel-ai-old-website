import { Meta } from 'solid-start'
import { BlogMetadata } from 'src/content/blogs'
import { Component, JSX } from 'solid-js'

const Blog: Component<{props: BlogMetadata, children: JSX.Element}> = ({props, children}) => {
  return (
    <div class="pt-20 flex justify-center bg-gradient-to-b from-[#202124] to-gray-800">
      <div class="max-w-5xl mb-10 mx-3">
        <Meta property='og:type' content='article' />
        <Meta property='og:title' content={props.title} />
        <Meta property='og:description' content={props.description} />
        <Meta property='og:author' content={props.author} />
        <Meta property='og:image' content={props.imageUrl} />
        <Meta property='article:published_time' content={new Date(props.publishedDate).toISOString()} />
        <div class="mb-3">
          <p class="text-white font-bold text-xl px-2">
            burn {props.links.replaceAll('/', ' · ')}
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
              <div class="flex pt-1">
                <div class="h-6 w-6 i-mdi-clipboard-text-clock" />
                <span class="px-4">{new Date(props.publishedDate).toDateString()}</span>
              </div>
              <div class="flex">
                <div class="h-6 w-6 i-mdi-account-edit" />
                <span class="px-4">{props.author}</span>
              </div>
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
