import { Component } from 'solid-js'
import { A } from 'solid-start'
import { BlogMetadata } from 'src/content/blogs'

const Card: Component<BlogMetadata> = (props) => {
  return (
    <A href={props.links} class="flex justify-center max-w-5xl">
      <div class="py-4 w-full">
        <div class="w-full flex flex-col sm:flex-row bg-white/5 rounded-lg text-white hover:scale-110 transition-all hover:shadow-lg">
          <img 
            class="h-48 rounded-lg sm:rounded-l-lg sm:mr-3 object-cover"
            src={props.imageUrl} alt={props.imageUrlAlt}
          />
          <div class="flex flex-col-reverse sm:flex-row px-2 pt-4">
            <div class="sm:w-96">
              <div class="font-bold text-2xl line-clamp-1 pb-4">
                <h2>{props.title}</h2>
              </div>
              <p class="text-lg font-medium line-clamp-3">
                {props.description}
              </p>
            </div>
            <div class="sm:w-48 flex justify-end">
              <div>
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
          </div>
        </div>
      </div>
    </A>
  )
}

export default Card
