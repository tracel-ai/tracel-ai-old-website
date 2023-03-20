import Layout from 'src/layout/page'

export default function() {
  return (
    <Layout>
      <div class="pt-[100px] px-20 flex justify-center ">
        <div class="bg-[#2a333e] rounded-lg px-6">
          <iframe class="w-[1050px] bg-[#2a333e]" height="450px" src="demo.html" />
        </div>
      </div>
    </Layout>
  )
}
