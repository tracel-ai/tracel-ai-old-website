import Blog from '@components/blog'
import { A, Meta } from 'solid-start'
import Layout from 'src/layout/page'

const Lorem = () => {
  return (
    <Layout>
      <Meta property='og:title' content='My very first Blog' />
      <div class="mt-20 mx-80"><A href="/blog" class="text-blue-300 mb-5">Blog</A> <span class="text-white">/ Lorem</span></div>
      <article class="blog">
        <Blog markdown={`# Lorem Ipsum
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis dolor volutpat sapien commodo interdum. Etiam bibendum ultrices luctus. Ut commodo egestas tincidunt. Nunc cursus ex ut varius pharetra. Etiam sit amet efficitur tortor. Sed porta imperdiet maximus. Suspendisse rutrum suscipit dignissim.

Sed porta convallis cursus. Nunc a ornare purus, ac mattis neque. Morbi tristique elit quam, ac posuere odio vulputate ultricies. Aenean iaculis massa turpis, id commodo lacus mattis id. In accumsan bibendum est quis maximus. Integer pharetra est elit, eget tristique lacus viverra at. Phasellus ut laoreet tellus. Donec sed tortor elit.

Vivamus commodo orci a libero ornare, nec fermentum sapien faucibus. Vestibulum cursus purus erat, vitae tempor dolor euismod commodo. In quis sapien nisi. Suspendisse consequat scelerisque leo, pulvinar ornare libero facilisis vitae. Aliquam a mauris finibus velit rutrum blandit. Vestibulum eu pulvinar lectus, ac condimentum massa. Ut vehicula laoreet arcu, eu condimentum velit semper vel. Vivamus gravida blandit risus, varius condimentum risus porttitor eu. Aenean quis mattis dui. Aenean et orci libero. Donec euismod varius volutpat. Aliquam sed justo convallis, lacinia magna et, rhoncus nibh.

Vestibulum hendrerit risus sit amet purus venenatis tincidunt convallis eu orci. Maecenas ultrices nisl justo, a efficitur mi placerat at. Fusce laoreet commodo sapien, sit amet tincidunt ipsum. Donec leo libero, auctor quis posuere id, mattis non diam. Cras vitae tempus sem. Praesent mollis eu felis nec scelerisque. Pellentesque nec fringilla ante. Sed varius molestie congue. Quisque vehicula elementum velit vel vulputate. Sed id magna sed lorem luctus sollicitudin. Sed accumsan diam turpis. Maecenas convallis lorem ex, et hendrerit quam luctus vel.

Sed consequat justo viverra risus varius gravida at vel mauris. Phasellus vitae nibh eros. In lectus ex, suscipit ac placerat a, feugiat eu ex. Vestibulum sed enim ipsum. Aliquam tempor lobortis libero nec feugiat. Pellentesque consectetur mi sit amet semper varius. Vivamus placerat tempus blandit.`} />

      </article>
    </Layout >
  )
}

export default Lorem


