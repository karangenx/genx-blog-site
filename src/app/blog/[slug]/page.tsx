import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import postsData from "@/data/posts.json";
import ReadingProgressBar from "@/components/ReadingProgressBar";

export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const getReadingTime = (content: string) => {
    if (!content) return "1 min read";
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Related posts (fetching latest for now)
  const relatedPosts = postsData.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <ReadingProgressBar />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-edge py-10 md:py-section-gap">
        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="mb-10 md:mb-gutter text-center">
            <div className="flex justify-center gap-2 mb-6">
              <Link href={`/category/${post.category.toLowerCase().replaceAll(' ', '-')}`}>
                <span className="font-label-sm text-xs md:text-label-sm bg-[#EBF2F7] text-primary px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer tracking-wide uppercase">
                  {post.category}{post.subCategory ? ` / ${post.subCategory}` : ''}
                </span>
              </Link>
            </div>
            <h1 className="font-display-lg text-3xl md:text-display-lg text-deep-navy dark:text-surface-white mb-6 md:mb-8 font-bold leading-tight" dangerouslySetInnerHTML={{ __html: post.title }}></h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-secondary font-body-md text-sm md:text-body-md mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-outline-variant bg-surface-container-low overflow-hidden relative">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdB2eKSPNrGZkQamf9ypW7qQjNgwlhZB9xlNc6vR7k6Em_ii9bOdemiC8tmhcExY95tclRWKuVaLxhsoJwb8aWQ6QLzYe9bURqY4xkVHC-xQ2htn8IR-lXXfUjhkXZ820X_ErI7WJoR8iV9vJYVeCt8mEsuLdV7GPRzTD0KcNsPqHG96hTjbbsN8e5C_ThtTW_gDQLr2paUE1ZB-4rrmzTaR1MJZJerTOeGwGea5DfWI1p2a9-L5kvvrayvsm5RbM_M6d7g1uPP_lM" alt="Author" fill className="object-cover" sizes="40px" />
                </div>
                <span>By <strong className="text-deep-navy dark:text-surface-white">Gen X Web Hosting</strong></span>
              </div>
              <span className="text-outline hidden sm:inline">•</span>
              <time dateTime={post.date}>{post.date}</time>
              <span className="text-outline hidden sm:inline">•</span>
              <span>{getReadingTime(post.content)}</span>
            </div>
          </header>

          {/* Hero Image */}
          {post.imageUrl && (
            <div className="w-full aspect-video md:aspect-[21/9] mb-12 md:mb-section-gap rounded-xl overflow-hidden border border-outline-variant shadow-sm relative group">
              <Image src={post.imageUrl} alt="Hero" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority sizes="(max-width: 1024px) 100vw, 1024px" />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-text dark:text-surface-white space-y-6 prose-headings:text-deep-navy dark:prose-headings:text-surface-white prose-a:text-primary hover:prose-a:text-primary-container prose-img:rounded-xl prose-img:shadow-md mx-auto dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-outline-variant flex flex-wrap gap-3">
            <span className="font-body-md font-semibold text-deep-navy dark:text-surface-white self-center mr-2">Category:</span>
            <span className="font-label-sm text-sm border border-outline-variant text-secondary px-4 py-1.5 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer">{post.category}</span>
          </div>

          {/* Author Bio Box */}
          <div className="mt-12 md:mt-section-gap bg-surface-bright dark:bg-surface-container p-6 md:p-8 rounded-xl border border-outline-variant flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start shadow-sm">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-outline-variant bg-surface-container-low overflow-hidden shrink-0 shadow-inner">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU8d4UdsgPXJQAaHWCF7cC3UIpDpK91pVQkYGh5Drwwwwm1wnMlsVI-ijLOEpL5eoE83eT1oMYX5f8EjvU-KVvnUuzjjN3IrBIahOWaG1K7_A0p0uH4SUPNcoeYdbel3szgO7O8OsJAHbF29TVe_MleLFFWCmNOrrthJwx6Z0HLPQs0lXQZGJ-5xTIhrF8K2K8q-_xHqyRR2ki8pnqgJAmC6HbzpmsGSW46BFfuDYH8YCRGSS15vLDjC_lxd7bIV3CTiC1en8KwOst" alt="Author" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-headline-md text-xl md:text-2xl text-deep-navy dark:text-surface-white mb-2 font-bold">Gen X Web Hosting</h3>
              <p className="font-body-md text-base md:text-body-md text-on-surface-variant mb-4">Experts in high-performance cloud infrastructure, domain management, and optimized web hosting solutions.</p>
              <a href="https://genxwhosting.com" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                Visit Website <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </article>
      </main>

      {/* Related Posts Section */}
      <section className="bg-surface dark:bg-transparent py-12 md:py-section-gap border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-edge">
          <h2 className="font-headline-lg text-2xl md:text-headline-lg text-deep-navy dark:text-surface-white mb-8 md:mb-10 font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-gutter">
            {relatedPosts.map(rp => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="block bg-surface-white dark:bg-surface-container border border-outline-variant rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 group shadow-sm hover:shadow-xl flex flex-col">
                <div className="h-48 md:h-52 w-full bg-surface-variant relative overflow-hidden">
                  <Image src={rp.imageUrl} alt="Thumbnail" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <span className="font-label-sm text-xs text-primary mb-3 block uppercase tracking-wide font-semibold">{rp.category}</span>
                  <h3 className="font-headline-md text-lg md:text-xl text-deep-navy dark:text-surface-white mb-3 group-hover:text-primary transition-colors font-bold line-clamp-2" dangerouslySetInnerHTML={{ __html: rp.title }}></h3>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mt-auto" dangerouslySetInnerHTML={{ __html: rp.excerpt }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
