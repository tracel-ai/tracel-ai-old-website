import Blog from '@components/blog'
import Stars from '@components/stars'
import { Reference, Bliblio } from '@components/blog/reference'
import { aCaseForRustInDeepLearning } from 'src/content/blogs'
import Layout from 'src/layout/page'

const Lorem = () => {
  const biblio = new Bliblio();
  const facebookDeveloperToolsRust = biblio.addReference(
    'A brief history of Rust at Facebook',
    'https://engineering.fb.com/2021/04/29/developer-tools/rust/',
  );
  const microsoftJoinRustFondation = biblio.addReference(
    'Microsoft joins Rust Foundation',
    'https://cloudblogs.microsoft.com/opensource/2021/02/08/microsoft-joins-rust-foundation/',
  );
  const githubRustCompanie = biblio.addReference(
    'A curated list of companies using Rust in production, organized by industry',
    'https://github.com/omarabid/rust-companies',
  );
  const tourOfrust = biblio.addReference(
    'Tour of Rust',
    'https://tourofrust.com/',
  );
  const theRustBook = biblio.addReference(
    'The Rust Programming Language Book',
    'https://doc.rust-lang.org/book/',
  );
  const theRustBookOwnership = biblio.addReference(
    'The Rust Programming Language Book: Understanding Ownership',
    'https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html',
  );
  const rustByExample = biblio.addReference(
    'Rust by Example',
    'https://doc.rust-lang.org/rust-by-example/',
  );

  biblio.addReference(
    'Operationalizing Machine Learning: An Interview Study',
    'https://arxiv.org/abs/2209.09125',
  );
  biblio.addReference(
    'Future Directions in Machine Learning',
    'https://www.frontiersin.org/articles/10.3389/frobt.2016.00079/full',
  );

  return (
    <Layout>
      <Stars numStars={15} bot={30}/> 
      <Blog 
        props={aCaseForRustInDeepLearning} 
        children={
          <div>
            <h2>
              Introduction
            </h2>
            <p>
              Despite the progress made in deep learning, the ongoing struggle to train and deploy models effectively at reasonable cost continues to limit the potential impact of that technology.
              While Python has been the go-to language for developing deep learning models, it's not known for its efficiency nor its ease of deployment.
              Recent advancements in other programming languages such as Rust and Go promise efficiency and scalable solutions.
            </p>
            <p>
              In this blog post, we will explore the case for Rust in deep learning and why it may be a better option than Python.
              With its ability to handle complexity through safe and concurrent abstractions, Rust has the potential to tackle the challenges of this field in a way that Python cannot.
            </p>
            <h2>
              Why Python?
            </h2>
            <p>
              Why is Python used in deep learning? At first glance, it appears to be a language for simple and short programs without strong requirements for performance.
              Deep learning systems today are far from simple, from complex model architectures to highly distributed computing at scale, it's unclear why the entire ecosystem has been written in Python.
              Let's first explore why this is the case by analyzing its properties that fit deep learning.
            </p>
            <p>
              The need for flexibility and high-level abstractions in developing deep learning models made Python a decent choice among researchers.
              The simplicity of the language with its low barrier of entry enabled fast iteration cycles, which is crucial when doing research.
              Coupled with its large ecosystem of libraries, it is clearer why Python became the leader in scientific computing.
            </p>
            <p>
              However, even if the first deep learning models were quite small and simple, it rapidly evolved into the complex field it is today.
              To support that complexity and the need for performance, bindings to low-level programming languages such as C and C++ were necessary.
            </p>
            <p>
              In this context, there are two groups of people: the engineers who develop and optimize the low-level details in frameworks, and the researchers who use Python to experiment and do cool stuff.
              While this approach has proven successful, it's far from ideal.
              From potentially creating frictions between engineers and researchers to restricting the amount of people who can meaningfully contribute to deep learning frameworks, having a two-language solution creates more complexity and frustration than necessary.
              Onboarding new people also becomes more difficult since they need to navigate a big codebase and a complex architecture to accommodate the constraints of both languages.
              This makes the development of deep learning frameworks inaccessible to most users and limits the amount of meaningful contributions.
            </p>
            <p>
              To be perfectly honest, it's hard to think of another viable alternative before Rust.
              This is the first programming language that I know of that has extremely high-level abstractions while also allowing for low-level control and performance.
            </p>
            <h2>
              Why Rust?
            </h2>
            <p>
              The main advantage of Rust for deep learning is its unique approach to abstractions.
              While commonly referred to as a system programming language, Rust offers much more potential.
              This is quite misleading, since it is a versatile language that allows for all kinds of applications on all scales of abstractions.
            </p>
            <p>
              Compared to other programming languages, Rust is the one that pushes zero-cost abstractions the furthest.
              This means that there are no performance costs to building abstractions within the language.
              Rust provides all of the tools you need and more to express high-level concepts, from meta-programming, which is writing code that generates code, to trait and associated types, which let you define type abstractions and relationships.
            </p>
            <p>
              With all of those options, Rust is a promising language for deep learning.
              However, all those capabilities come with a cost: Rust has a steep learning curve.
              It's well known that Rust is not the easiest programming language to learn.
              It does not perfectly conform to the traditional object-oriented or functional programming paradigms.
              This requires adaptation since old patterns don't translate directly into Rust.
              The reason is that most patterns are not concurrent and/or memory-friendly because they assume one or multiple concepts such as single-threaded execution, unsafe manual memory management, garbage collection, copy-on-write, etc.
              To allow for zero-cost concurrent and memory-safe abstractions, Rust uses the ownership system with inner mutability.
              Without going into details, the method consists of enforcing ownership and borrowing rules at compile time, as seen in the chapter on ownership in the Rust book
              <Reference references={[theRustBookOwnership.ref()]} />.
            </p>
            <p>
              When someone is getting used to "the Rust way", it becomes incredibly frustrating to work with any other language.
              This may explain why Rust has consistently been the most loved programming language since 2015 according to Stack Overflow surveys.
              It is currently gaining a lot of momentum with Microsoft, Meta, and other big corporations embracing it
              <Reference references={[facebookDeveloperToolsRust.ref(), microsoftJoinRustFondation.ref(), githubRustCompanie.ref()]} />.
              The community has made tons of efforts into making the language more accessible by providing books, tutorials and general content, so there are lots of resources available to help learn Rust
              <Reference references={[tourOfrust.ref(), theRustBook.ref(), rustByExample.ref()]}/>.
            </p>
            <p>
               Now let's dive into how this could impact deep learning.
            </p>
            <h3>
              Deployment
            </h3>
            <p>
              With Rust, building, testing, and deploying code is incredibly easy.
              Thanks to Cargo, the Rust package manager, all of your dependencies will be downloaded, compiled, and linked into a single executable that targets the platform of your choice.
              There is no runtime necessary, and all the dependency versions and compatibility issues are taken care of for you.
            </p>
            <p>
              Therefore, this enables the community to share and collaborate on a diverse set of libraries and frameworks that are ready to be deployed.
              Even if those packages are new, immature, and unstable, it's not uncommon to deploy them and be confident they will work as expected without much effort.
              The same could occur in deep learning with new models being deployed into the world without the need for additional effort into creating optimized inference pipelines.
            </p>
            <h3>
              Flexibility
            </h3>
            <p>
              This is all sunshine and rainbows, but the need for deep learning is not only defined by how easy it is to deploy, but also how easy it is to invent, create, and discover new techniques.
              To do that, deep learning frameworks need to be extremely flexible, which is enabled by high-level abstractions, and as mentioned above, Rust provides them.
              In addition, Rust also enables safe concurrent programming, which could materialize into an asynchronous and sparse neural architecture, which has the potential to scale models way more efficiently than methods used today.
            </p>
            <p>
              Almost the only way to increase performance in deep learning systems today is by leveraging operations executed by low-level routines.
              This limits the use of for-loops and other programming language constructs, which hurt flexibility.
              Having one performant language that is used at all levels of abstraction would allow for way more innovations.
            </p>
            <p>
              Giving researchers and engineers the ability to collaborate and investigate new solutions in every part of the deep learning stack seems like a big win to me.
            </p>
            <h2>
              Conclusion
            </h2>
            <p>
              I believe Rust has a good chance to become the go-to language in deep learning despite the initial high barrier to entry.
              I also believe that people can overcome it and learn new concepts; is this not what we like to do anyway?
              Rust has the power to bring researchers and engineers together in new and exciting ways, pushing the boundaries of what is possible.
              Of course this won't be easy, the ecosystem is much smaller than in Python, but I see it as a learning opportunity, and I plan to do my best to contribute and make it a reality.
            </p>
            <h2>
              References
            </h2>
            {biblio.generate()}
          </div>
      }/>
    </Layout >
  )
}

export default Lorem

