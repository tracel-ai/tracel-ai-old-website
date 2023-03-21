import Layout from 'src/layout/page'
import { createSignal } from 'solid-js';

export default function() {
  let [height, setHeight] = createSignal(615);

  onMount(() => {
    const resize = (doc: Document) => {
      if (doc.body) {
        const rect = doc.body.getBoundingClientRect();
        if (rect && rect.height > 500) {
          setHeight(rect.height + 40);
        }
      }
    }

    const iframe: any = document.getElementById('demo-iframe');
    const doc: Document = iframe.contentDocument;
    const win: Window = iframe.contentWindow;

    win.addEventListener("resize", () => resize(doc));

    // Initilize the iframe height
    resize(doc);

    // Adding some timeouts to make sure it is correctly initialized
    setTimeout(() => resize(doc), 200);
    setTimeout(() => resize(doc), 1000);
  });

  return (
    <Layout>
      <div class="pt-[100px] px-6 flex justify-center ">
        <div class="w-full flex justify-center">
          <iframe 
            id="demo-iframe"
            class="max-w-[1500px] w-full bg-[#2a333e] rounded-lg px-6"
            height={height()}
            src="/mnist_inference_web.html" 
          />
        </div>
      </div>
    </Layout>
  )
}
