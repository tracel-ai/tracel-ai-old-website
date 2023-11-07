import Blog from '@components/blog'
import Stars from '@components/stars'
import { Table } from '@components/blog/table'
import { Reference, Biblio } from '@components/blog/reference'
import { highPerformanceAsyncBackendBurnCompute } from 'src/content/blogs'
import Layout from 'src/layout/page'

const Content = () => {
  const biblio = new Biblio()

  const crossPlatformGpuBackend = biblio.addReference(
    "Burn's New Cross-Platform GPU Backend",
    'https://burn.dev/blog/cross-platform-gpu-backend'
  )
  const burnRustyApproachTensorHandling = biblio.addReference(
    "Reduced Memory Usage: Burn's Rusty Approach to Tensor Handling",
    'https://burn.dev/blog/burn-rusty-approach-to-tensor-handling'
  )
  const wgpu_docs = biblio.addReference(
    'WGPU Documentation',
    'https://docs.rs/wgpu/latest/wgpu/'
  )
  const libTorch = biblio.addReference(
    'LibTorch Documentation',
    'https://pytorch.org/cppdocs/'
  )
  const candle = biblio.addReference(
    'Candle GitHub',
    'https://github.com/huggingface/candle'
  )
  const burnComputeCrate = biblio.addReference(
    'Burn-Compute Crate',
    'https://github.com/burn-rs/burn/tree/main/burn-compute'
  )
  const asynchronous = biblio.addReference(
    'Dive Into Deep Learning: Asynchronous Compution',
    'https://d2l.ai/chapter_computational-performance/async-computation.html'
  )
  const autotune = biblio.addReference(
    'Lianmin Zheng: Automatic Kernel Optimization for Deep Learning on All Hardware Platforms',
    'https://lmzheng.net/posts/2018/10/auto-tune-all'
  )
  return (
    <Layout>
      <Stars numStars={15} bot={30} />
      <Blog
        props={highPerformanceAsyncBackendBurnCompute}
        children={
          <div>
            <h2>Introduction</h2>
            <p>
              When we first published the <code>Burn-Wgpu</code>Burn-Wgpu crate{' '}
              <Reference references={[crossPlatformGpuBackend.ref()]} />, our
              primary focus was on achieving great portability without
              sacrificing correctness, postponing efficiency optimizations a
              little. With the feedback we soon gathered from our users, we
              realized that the next priority was to reduce memory consumption.
              Indeed, at the early stage of the WGPU backend, there was never
              any reuse of the memory dedicated to tensors that were not used
              anymore. Each tensor allocated a new chunk of memory using the
              Graphics API, and when out of scope, the memory was deallocated.
              We did have our optimized in-place operations, as described in a
              previous blog
              <Reference references={[burnRustyApproachTensorHandling.ref()]} />
              , but using <i>new</i> tensors meant allocating and deallocating
              memory using the Graphics API, which remained very slow and
              costly. In addition, the deallocations were only called when many
              kernels were executed, often creating high memory peaks.
            </p>
            <p>
              With that in mind, we needed an intelligent reuse of memory that
              would reduce memory peaks and avoid allocations and deallocations
              when possible. After contemplating the idea of a major refactor of
              the Burn-Wgpu crate, we figured we were going to face the same
              problems with all of our future <i>in-house</i> backends (which
              are self-contained within the Burn project, as opposed to our
              third-party backends based on LibTorch{' '}
              <Reference references={[libTorch.ref()]} /> or Candle{' '}
              <Reference references={[candle.ref()]} />
              ). So we decided to go for an abstract approach, relying heavily
              on Rust traits, to write all the logic that applies to every
              in-house backend in one place. Then the specifics of every backend
              can be encapsulated within the trait implementations.
            </p>
            <p>
              This is how we arrived at the concept of <code>Burn-Compute</code>
              <Reference references={[burnComputeCrate.ref()]} />. It is a crate
              within the Burn project that abstracts many backend mechanics,
              even beyond memory management. Indeed, we have used this
              architecture to separate mutable environments from immutable ones,
              allow for transparent asynchronous kernel execution, and even
              automatic kernel selection, which we call autotuning.
            </p>

            <h2>Client-Server Architecture</h2>
            <p>
              In a high-performance backend, asynchronous computation is key for
              parallelization and responsiveness{' '}
              <Reference references={[asynchronous.ref()]} />. Put another way,
              the actual computations on tensors in the model should not
              interfere with the normal execution of the framework.{' '}
              <code>Burn-Compute</code>'s main purpose is to isolate the
              asynchronous computations from the rest of the software, using a
              client-server architecture like the one below:
            </p>
            <img
              class="w-full my-6 border-2 bg-white rounded"
              src="/burncompute.svg"
            />
            <p>
              In this figure, <i>squares</i> are concrete structs while{' '}
              <i>rounded squares</i> are abstract traits. The Compute Channel is
              implemented by either a mutex-locking channel, a multi-producer,
              single-consumer (MPSC) channel, or a RefCell channel, which is
              used in single-threaded applications, like when in a no-std
              environment. Memory Management is implemented by the Simple Memory
              Management strategy (which may be switched easily to other
              strategies once they exist).
            </p>
            <p>
              Finally, the Compute Server and the Storage must be implemented in
              every backend based on <code>Burn-Compute</code>. In our WGPU
              backend, the server encapsulates WGPU concepts such as Command
              Encoders, Queues and Compute Pipelines, while the storage
              encapsulates the WGPU buffers{' '}
              <Reference references={[wgpu_docs.ref()]} />.
            </p>
            <p>
              As you may have noticed, we have also added an arrow going into
              the Compute Client to emphasize that using Burn-Compute is done
              through calls to the client, which has a simple API:
            </p>
            <ul class="list-disc px-8 text-xl pb-8">
              <li>
                <span class="font-bold">Empty:</span> allocates a memory space
                of a given size, and returns a handle to this space;
              </li>
              <li>
                <span class="font-bold">Create:</span> similar to empty but
                filling the space with given data;
              </li>
              <li>
                <span class="font-bold">Read:</span> returns the data at a given
                handle;
              </li>
              <li>
                <span class="font-bold">Execute:</span> given a kernel and
                handles to inputs and outputs of the kernel, asks the server to
                run the kernel on the data;
              </li>
              <li>
                <span class="font-bold">Sync:</span> waits for all asynchronous
                executions to be over;
              </li>
              <li>
                <span class="font-bold">Execute_autotune:</span> see Autotune
                section.
              </li>
            </ul>
            <p>
              When implementing operations for a backend, a few calls to the
              client suffice for the memory to be automatically handled
              intelligently.
            </p>
            <h2>Memory Management</h2>
            <p>
              Although we have written the Memory Management as a trait, we do
              not ask that the backend defines its own struct for it (although
              it could). Indeed, we already provide what we call the Simple
              Memory Management Strategy, which can be used transparently on any
              backend that leverages Burn-Compute.
            </p>
            <h3>Concepts</h3>
            <p>
              Before we explain the memory management algorithms in details, let
              us define some concepts:
            </p>
            <ul class="list-disc text-xl px-8 pb-8">
              <li>
                <span class="font-bold">Allocating</span> memory means asking
                the storage to reserve actual memory space for data. In WGPU, it
                means creating a whole new buffer.
              </li>
              <li>
                <span class="font-bold">Deallocating</span> memory means freeing
                that memory, so that no part of the code should point to it.
              </li>
              <li>
                A <span class="font-bold">chunk</span> of memory is a
                contiguous, fixed-size region of memory that was reserved at
                once during one allocation.
              </li>
              <li>
                A <span class="font-bold">slice</span> of memory is a portion of
                a chunk, defined by a starting index over the chunk and a size.
              </li>
              <li>
                A <span class="font-bold">free chunk</span> is a chunk which is
                not used by any tensor or any slice. It is important to
                distinguish between a free chunk, and deallocated memory. The
                former still takes place in memory, although it is useless if
                not reused cleverly.
              </li>
              <li>
                A <span class="font-bold">free slice</span> is, similarly, a
                slice which is not used by any tensor.{' '}
              </li>
              <li>
                <span class="font-bold">Reserving</span> memory means finding a
                place for new data, either as a chunk or a slice, with either
                new allocation or reuse.
              </li>
            </ul>
            <p>We also offer two sub-strategies:</p>
            <ul class="list-disc text-xl px-8 pb-8">
              <li>
                The <span class="font-bold">deallocation strategy</span> allows
                us to configure how often we should go through the process of
                converting free chunks to deallocated memory. It can be either
                every <i>n</i> memory reserves (which we call Deallocation
                period in the Benchmarks section), every <i>n</i> seconds
                (unavailable in no-std environment), or simply never. Remember,
                never deallocating does not mean that we are always allocating
                new chunks for each new tensor because free chunks can be reused
                before being deallocated.
              </li>
              <li>
                The <span class="font-bold">slice strategy</span> allows us to
                configure in what setting we can use a slice over a chunk.
                Suppose we have a free chunk of 1,000 bytes; then we will need
                two contiguous spaces of 500 bytes each. It would make sense to
                reuse the chunk with two slices. But consider another scenario
                where we have first a very small tensor of 10 bytes, followed by
                a new 1,000 bytes tensor. If we are not careful, then the 10
                bytes tensor may take a slice over the chunk, leaving only 990
                bytes of memory, which will not be enough for the new 1,000
                bytes tensor, and we will need to allocate more memory. The
                <span class="font-bold">slice ratio</span> in the Benchmarks
                section is the fraction of a chunk's length that a slice must
                have in order to be used on this chunk.
              </li>
            </ul>

            <h3>Memory Reserve Algorithm</h3>
            <p>
              The algorithm for reserving memory takes as input a simple integer
              representing the size of the tensor for which memory is needed.
            </p>
            <p>
              It first begins by searching through all allocated chunks,
              discarding those that are not free or too small. If it finds a
              free chunk of exactly the same size (which may happen rather often
              in some predictable scenarios), it stops the search and uses it.
            </p>
            <p>
              If no exact chunk exists, it will fall back on creating a new
              slice on the smallest chunk among all chunks that are free and can
              accept slices (depending on the slice strategy). Only then, if no
              such chunk exists, a new chunk will be allocated, with the exact
              needed size.
            </p>

            <h3>Cleanup Algorithm</h3>
            <p>How do we know if slices and chunks are free?</p>
            <p>
              We leverage Rust's reference counting. Indeed, we know that a
              chunk is free if no tensor nor slice points towards it. Because it
              will still be held in the memory management, it is therefore free
              when the strong count is exactly 1. On the other hand, a slice
              should be free when no tensor points towards it, but it will still
              be held by both the memory management and the chunk on which it
              lies. Therefore, a slice is free if its strong count is 2.
            </p>
            <p>
              Because free slices are trivial to delete, as we only need to
              delete the slice ID from the memory management and the underlying
              chunk, we delete them at every new memory reservation. The
              deletion of free chunks simply depends on the deallocation
              strategy.
            </p>

            <h3>Benchmarks</h3>
            <p>
              This simple strategy is already enough to lead to remarkable
              improvements.
            </p>
            <p>
              Our benchmarks are done on an NVIDIA graphics card. They compare
              the peak memory consumption attained for two different models (
              <i>static convolution network</i> and{' '}
              <i>dynamic transformer encoder</i>). We have run the benchmarks on
              both our previous WGPU implementation (Burn v0.9.0) and on the new
              WGPU implementation, based on Burn-Compute. We also compare
              ourselves with the reference LibTorch, which is highly optimized
              for CUDA devices.
            </p>

            <Table
              title="Benchmark: Static Convolution Network"
              description="The peak amount of memory attained by different backend configurations using a simple ConvNet trained on images. The 'Never' deallocation period is not shown as it is unusable, leading to memory exhaustion."
              columnNames={[
                <div>
                  <div>Backend</div>
                </div>,
                <div>
                  <div>Deallocation</div>
                  <div>Period</div>
                </div>,
                <div>
                  <div>Slice</div>
                  <div>Ratio</div>
                </div>,
                <div>
                  <div>Max GPU</div>
                  <div>Memory</div>
                </div>,
              ]}
              entries={[
                {
                  values: [
                    <span>WGPU - v0.9.0</span>,
                    <span>-</span>,
                    <span>-</span>,
                    <span>290 MiB</span>,
                  ],
                },
                {
                  values: [
                    <span>WGPU</span>,
                    <span>1000</span>,
                    <span>0.9</span>,
                    <span>154 MiB</span>,
                  ],
                },
                {
                  values: [
                    <span>WGPU</span>,
                    <span>128</span>,
                    <span>0.8</span>,
                    <span class="font-bold">146 MiB</span>,
                  ],
                },
                {
                  values: [
                    <span>WGPU</span>,
                    <span>Never</span>,
                    <span>0.9</span>,
                    <span class="font-bold">146 MiB</span>,
                  ],
                },
                {
                  values: [
                    <span>LibTorch</span>,
                    <span>-</span>,
                    <span>-</span>,
                    <span>264 MiB</span>,
                  ],
                },
              ]}
            />
            <Table
              title="Benchmark: Dynamic Transformer Encoder."
              description="The peak amount of memory attained by different backend configurations using a Transformer Encoder trained on text with different sequence lengths."
              columnNames={[
                <div>
                  <div>Backend</div>
                </div>,
                <div>
                  <div>Deallocation</div>
                  <div>Period</div>
                </div>,
                <div>
                  <div>Slice</div>
                  <div>Ratio</div>
                </div>,
                <div>
                  <div>Max GPU</div>
                  <div>Memory</div>
                </div>,
              ]}
              entries={[
                {
                  values: [
                    <span>WGPU - v0.9.0</span>,
                    <span>-</span>,
                    <span>-</span>,
                    <span>3723 MiB</span>,
                  ],
                },
                {
                  values: [
                    <span>WGPU</span>,
                    <span>1000</span>,
                    <span>0.9</span>,
                    <span>3229 MiB</span>,
                  ],
                },
                {
                  values: [
                    <span>WGPU</span>,
                    <span>128</span>,
                    <span>0.8</span>,
                    <span class="font-bold">2234 MiB</span>,
                  ],
                },
                {
                  values: [
                    <span>LibTorch</span>,
                    <span>-</span>,
                    <span>-</span>,
                    <span class="font-bold">2232 MiB</span>,
                  ],
                },
              ]}
            />
            <p>
              As we can see, in both models, before Burn-Compute, the memory
              usage of WGPU was always worse than LibTorch's. For static graphs,
              our simple memory management strategy is already very effective,
              dividing the memory use by 2. In this specific situation, we are
              already quite better than LibTorch, the reason being that the
              combination of in-place operations with Burn-Compute brings near
              optimality for static graphs.
            </p>
            <p>
              On the other hand, our strategy is still too simplistic to perform
              optimally in the dynamic setting. However, it's still
              significantly more efficient than in our previous version, and
              almost on par with LibTorch if we use the right configuration.
            </p>
            <h2>Autotune</h2>
            <p>
              Now, let us explain the autotune mechanism of Burn-Compute, which
              is quite independant of the memory management but still within{' '}
              <code>Burn-Compute</code> as it can be used transparently on any
              in-house backend. When calling <code>Execute_autotune</code> on
              the Compute Client, it first goes through the Tuner struct, which
              uses an autotuning mechanism for choosing which kernel should be
              executed. Then, other <code>Compute Client</code> commands are run
              depending on the decisions of the Tuner.
            </p>
            <p>
              The concept of autotuning is rather simple. Suppose you have
              access to different kernels (or one kernel but with different
              parameter combinations) that all achieve the same results, albeit
              at different computing speeds. You will want to use the fastest,
              but which is it? Some kernels may outperform the others on small
              inputs but be very slow on large inputs. Furthermore, some may be
              faster only on specific hardware, making it impossible to have a
              fixed kernel selection strategy that works for everyone.
              Autotuning is about finding the fastest kernel in any setting,
              simply by benchmarking all the possibilities first. For more
              details, you may refer to
              <Reference references={[autotune.ref()]} />.
            </p>
            <p>
              This is a very dynamic and general strategy, but it comes at the
              cost of some computational overhead for all users. Most of the
              difficulty in implementing autotune comes from minimizing this
              overhead.
            </p>
            <p>
              One obvious strategy is to use a cache for reusing the fastest
              kernels in already seen settings, without doing the benchmarking
              again. However, using a cache means it must be in a mutable
              environment. Then why did we choose to leave the tuner on the
              client side rather than on the server side, which is designed to
              be mutable, imposing the use of another mutex? It is because the
              server works at a lower level of abstraction than the tuner. On
              the server side, it would have needed to take the handles logic of
              te memory management into account, giving it very little
              flexibility. Simply by being on the client side, it is able to
              benchmark complex operations that may be composed of several
              kernels.
            </p>
            <p>
              We will not delve deeper into the autotune mechanism for now.
              Because it is closely linked to other interesting concepts, such
              as matrix multiplication algorithms and their benchmarks, we
              prefer to dedicate a full blog post to it in the near future.
            </p>
            <h2>Conclusion</h2>
            <p>
              It has now become very straightforward to create a new backend
              from scratch. It suffices to implement a Compute Server, a storage
              struct and computation kernels to automatically benefit from
              clever memory management, asynchronous execution of the kernels,
              and autotuning. One of our hopes is that any independent chip
              manufacturer may write a backend for their hardware and have
              everything in hand to be competitive.
            </p>
            <h2>References</h2>
            {biblio.generate()}
          </div>
        }
      />
    </Layout>
  )
}

export default Content
