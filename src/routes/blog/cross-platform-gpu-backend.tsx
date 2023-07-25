import Blog from "@components/blog";
import Stars from "@components/stars";
import { Reference, Bliblio } from "@components/blog/reference";
import { crossPlatformGpuBackend } from "src/content/blogs";
import Layout from "src/layout/page";

const Content = () => {
  const biblio = new Bliblio();
  const wgpuWebsite = biblio.addReference(
    "WGPU: Cross-platform, safe, pure-rust graphics api",
    "https://wgpu.rs/"
  );
  const bevyGameEngine = biblio.addReference(
    "Bevy: A refreshingly simple data-driven game engine built in Rust",
    "https://bevyengine.org/"
  );
  const eguiFramework = biblio.addReference(
    "Egui: an easy-to-use immediate mode GUI in Rust that runs on both web and native",
    "https://github.com/emilk/egui"
  );
  const webgpuComputationsPerformanceInComparisonToWebGl = biblio.addReference(
    "WebGPU computations performance in comparison to WebGL",
    "https://pixelscommander.com/javascript/webgpu-computations-performance-in-comparison-to-webgl/"
  );
  const chromeShipsWebGPU = biblio.addReference(
    "Chrome ships WebGPU",
    "https://developer.chrome.com/blog/webgpu-release/"
  );
  const imageNet = biblio.addReference(
    "ImageNet Classification with Deep Convolutional Neural Networks",
    "https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf"
  );

  return (
    <Layout>
      <Stars numStars={15} bot={30} />
      <Blog
        props={crossPlatformGpuBackend}
        children={
          <div>
            <h2>Introduction</h2>
            <p>
              Burn has had the capability to run deep learning models on GPU
              since its inception, thanks to its utilization of Tch (bindings to
              LibTorch). This approach has proven to be highly effective,
              allowing for rapid iteration on the architecture, user APIs, and
              the automatic differentiation system. The need to write kernels
              and apply low-level performance optimizations was alleviated,
              allowing the team to focus on making significant progress faster.
              As we reached a level of satisfaction with our advancements, we
              slowly transitioned our focus to lower-level implementations. This
              allows us to leverage Burn's type system and enhance hardware
              compatibility. Ultimately, to be able to maximize performance and
              apply specific optimizations such as operation fusion, we need
              control over GPU kernels; thus we decided to write our own
              backend.
            </p>
            <p>
              After careful consideration of the technology to employ for
              developing our first GPU backend, we opted to use WGPU{" "}
              <Reference references={[wgpuWebsite.ref()]} />. While we already
              had a CUDA backend with LibTorch, we recognized the value of
              starting with a multiplatform backend rather than solely focusing
              on CUDA. Initially, we contemplated using the Vulkan API, but we
              acknowledged that it is not universally supported across all
              devices. WGPU, on the other hand, offers several advantages. It
              allows for the translation of WGSL to SPIR-V when using the Vulkan
              backend, and it also supports the direct use of SPIR-V. Moreover,
              WGPU stands out as the most popular and well-supported Rust
              graphics library, with numerous other libraries built upon it.
              Considering these factors, WGPU emerged as the optimal solution
              for Cross-Platform GPU programming, automatically targeting
              Vulkan, OpenGL, Metal, Direct X11/12, and WebGPU.
            </p>
            <h2>Cross-platform Applications</h2>
            <h3>Video games</h3>
            <p>
              Burn is not the sole crate that harnesses WGPU for cross-platform
              graphics. It finds widespread adoption in various domains,
              including game engines like Bevy{" "}
              <Reference references={[bevyGameEngine.ref()]} /> and UI
              frameworks like Egui{" "}
              <Reference references={[eguiFramework.ref()]} />. The potential of
              integrating deep learning models with Burn into game engines
              excites us, as it eliminates the need for Python and enables the
              utilization of the same graphics API as the game itself. The
              prospect of incorporating on-device learning into game mechanics
              opens up countless exciting possibilities. This is something not
              achievable when deploying trained models with only an inference
              runtime. We eagerly await the development of future Pokemon and
              Tamagotchi games 😅, as we can envision innovative implementations
              that would be truly captivating.
            </p>
            <h3>Privacy</h3>
            <p>
              With the comprehensive support from the entire Burn ecosystem, we
              have the capability to deploy on any device, which in turn opens
              up possibilities for models to be trained locally using the user's
              GPU. This becomes particularly advantageous when handling
              sensitive data, as it ensures that information remains secure
              without being transmitted to an untrusted server. This localized
              approach proves highly beneficial for tasks involving biometric
              recognition, allowing training on personal sensitive data while
              avoiding sharing it with large corporations. Even when using only
              inference, this approach proves valuable, especially in the
              context of language models where you might not want your prompts
              to be tracked. Naturally, to implement this, the model weights
              would need to be downloaded to the device, which may make handling
              very large models impractical at this stage. Nonetheless, the
              potential applications and privacy benefits are significant and
              promising.{" "}
            </p>
            <h3>Web and mobile</h3>
            <p>
              The utilization of GPUs within browsers has historically been
              challenging, given the numerous limitations associated with WebGL
              for computations{" "}
              <Reference
                references={[
                  webgpuComputationsPerformanceInComparisonToWebGl.ref(),
                ]}
              />
              . However, substantial efforts have been made to address these
              issues with the introduction of the next generation of GPU APIs.
              Notably, Google has developed WebGPU , and although browser
              support is relatively recent{" "}
              <Reference references={[chromeShipsWebGPU.ref()]} />, it shows
              great promise. We believe that this technology holds vast
              potential for professional web applications, enabling them to
              significantly reduce latency and enhance privacy, particularly in
              image processing and video editing applications. Additionally,
              mobile applications can benefit from the ability to seamlessly
              support offline mode by running inference locally. For instance,
              translation applications can leverage on-device processing to
              translate foreign languages while traveling abroad without
              requiring internet access. The possibilities that WebGPU presents
              for both web and mobile applications are truly exciting.
            </p>
            <h2>Hardware</h2>
            <p>
              NVIDIA has dominated the GPGPU field since the introduction of
              CUDA in 2007. It played a crucial role in the development of
              AlexNet, the first large-scale deep learning model that
              demonstrated superior results over classical machine learning
              techniques <Reference references={[imageNet.ref()]} />.
              Consequently, many tools have been built around NVIDIA's hardware,
              potentially leading to an industry-wide dependency that may not be
              advantageous for end consumers. However, with WGPU supporting all
              major graphics APIs, any hardware manufacturer can now run Burn
              models. This opens up the possibility of training models locally
              on GPUs from AMD, Intel, and Mac OS, greatly enhancing the
              development experience for those without an NVIDIA GPU.
              Furthermore, WGPU proves to be a valuable asset for deploying
              models on embedded devices with GPU capabilities, further
              expanding its utility and versatility.
            </p>
            <h2>Performance</h2>
            <p>
              In this initial iteration of the backend, our primary focus lay on
              ensuring correctness, refining the GPU computing pipeline, and
              enhancing GPU memory management. While some efforts have been
              devoted to performance optimization, like implementing a tiling 2D
              algorithm for the matrix multiplication kernel, further
              enhancements, such as warptiling, can unlock even greater speed
              improvements. Presently, all kernels are written using WGSL, but
              in the future, we may explore utilizing SPIR-V pass-through with
              Vulkan vendor graphics extensions to capitalize on
              hardware-specific features like Tensor Cores on Nvidia GPUs. To
              facilitate the optimization process, we have established a robust
              benchmark system. This system allows us to compare various kernels
              executed on different hardware configurations with distinct
              parameters. Eventually, this benchmark system will serve as the
              foundation for implementing automatic kernel selection, commonly
              known as autotuning. By automatically identifying the most
              performant kernels for the specific hardware and graphics API in
              use, we aim to streamline and enhance Burn's performance in a
              dynamic and adaptive manner.
            </p>
            <h2>Conclusion</h2>
            <p>
              WGPU serves as our initial cross-platform GPU backend
              implementation, providing essential capabilities for deploying
              Burn models on various hardware setups. Its support will be
              instrumental in implementing backend features like operation
              fusion, autotuning, and quantization, enhancing the overall
              performance. We are genuinely interested in witnessing the
              potential of deep learning in diverse areas, including video
              games, web, mobile, and embedded applications. Supporting the
              community's use of Burn as they develop new applications is highly
              motivating for us. We look forward to discovering what will be
              built with Burn and WGPU.
            </p>
            <h2>References</h2>
            {biblio.generate()}
          </div>
        }
      />
    </Layout>
  );
};

export default Content;
