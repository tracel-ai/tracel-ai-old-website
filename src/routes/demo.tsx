import Layout from 'src/layout/page'

export default function() {
  return (
    <Layout>
      <div class="pt-[100px] px-6 flex justify-center ">
        <div class="w-full flex justify-center">
          <iframe 
            id="demo-iframe"
            class="max-w-[1500px] w-full bg-[#2a333e] rounded-lg px-6"
            height="680px"
            src="/mnist_inference_web.html" 
          />
        </div>
      </div>
    </Layout>
  )
}
