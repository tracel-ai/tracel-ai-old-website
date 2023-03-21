import Layout from 'src/layout/page'
import { createSignal } from 'solid-js';

export default function() {
  let [height, setHeight] = createSignal(615);

  const resizeIframe = () => {
    const iframe: any = document.getElementById('demo-iframe');
    const doc: Document = iframe.contentDocument;

    if (doc.body) {
      const rect = doc.body.getBoundingClientRect();
      console.log(rect);
      if (rect && rect.height > 500) {
        setHeight(rect.height + 40);
      }
    }
  };


  onMount(() => {
    const iframe: any = document.getElementById('demo-iframe');
    const win: Window = iframe.contentWindow;

    win.addEventListener("resize", () => resizeIframe());

    // Initilize the iframe height
    resizeIframe();

    // Adding some timeouts to make sure it is correctly initialized
    setTimeout(() => resizeIframe(), 200);
    setTimeout(() => resizeIframe(), 1000);
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
