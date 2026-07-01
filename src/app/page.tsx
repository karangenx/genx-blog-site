import Image from "next/image";
import Link from "next/link";
import postsData from "@/data/posts.json";

export default function Home() {
  const posts = postsData || [];
  
  const getReadingTime = (content: string) => {
    if (!content) return "1 min read";
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${minutes} min read`;
  };
  
  if (posts.length === 0) {
    return <main className="flex-grow w-full max-w-container-max mx-auto px-margin-edge py-section-gap text-center text-on-surface">No posts found.</main>;
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  // Group posts by category
  const postsByCategory = remainingPosts.reduce((acc: Record<string, any[]>, post: any) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {});

  const groupedCategories = Object.entries(postsByCategory);

  // Calculate dynamic category counts
  const categoryCounts = posts.reduce((acc: Record<string, number>, post: any) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.entries(categoryCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  // Calculate popular tags (using categories as a proxy for tags since WP API data didn't fetch tags explicitly)
  const popularTags = Array.from(new Set(posts.map((p: any) => p.category))).slice(0, 6) as string[];

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-edge py-12 md:py-section-gap grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-gutter">
      {/* Primary Column (Articles) */}
      <div className="lg:col-span-8 flex flex-col gap-12 md:gap-section-gap">
        {/* Hero Article */}
        <article className="bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
          <Link href={`/blog/${featuredPost.slug}`} className="h-56 md:h-96 w-full bg-surface-container-low dark:bg-surface-container-highest relative cursor-pointer block overflow-hidden">
            <Image
              src={featuredPost.imageUrl}
              alt={featuredPost.title}
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </Link>
          <div className="p-6 md:p-gutter flex flex-col gap-4 md:gap-base">
            <div className="flex items-center gap-base mb-2">
              <Link href={`/category/${featuredPost.category.toLowerCase().replaceAll(' ', '-')}`}>
                <span className="bg-[#EBF2F7] dark:bg-primary-fixed-dim text-primary-container dark:text-on-primary-fixed font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wide cursor-pointer hover:bg-primary hover:text-white transition-colors">
                  {featuredPost.category}
                </span>
              </Link>
              <span className="text-secondary dark:text-secondary-fixed-dim font-body-sm text-sm flex items-center gap-2">
                {featuredPost.date}
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                {getReadingTime(featuredPost.content)}
              </span>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-navy font-bold hover:text-primary transition-colors cursor-pointer" dangerouslySetInnerHTML={{ __html: featuredPost.title }}>
              </h1>
            </Link>
            <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant line-clamp-3" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }} />
            <Link href={`/blog/${featuredPost.slug}`} className="text-primary font-body-md text-body-md font-semibold mt-2 md:mt-4 hover:underline flex items-center gap-1 group w-max">
              Read Full Story
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            </Link>
          </div>
        </article>

        {/* Grouped Articles by Category */}
        {groupedCategories.map(([categoryName, categoryPosts]) => (
          <section key={categoryName} className="mb-12 md:mb-section-gap last:mb-0">
            <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b border-surface-variant dark:border-outline">
              <h2 className="font-headline-md text-xl md:text-headline-md text-deep-navy dark:text-surface-white font-bold">{categoryName}</h2>
              <Link href={`/category/${categoryName.toLowerCase().replaceAll(' ', '-')}`} className="text-primary hover:underline font-body-md text-sm font-medium">View All {categoryName}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-gutter">
              {categoryPosts.slice(0, 4).map((post) => (
                <article key={post.id} className="bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group">
                  <Link href={`/blog/${post.slug}`} className="block h-48 md:h-56 w-full bg-surface-container-low dark:bg-surface-container-highest relative overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                  <div className="p-5 flex flex-col gap-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <Link href={`/category/${post.category.toLowerCase().replaceAll(' ', '-')}`}>
                        <span className="bg-[#EBF2F7] dark:bg-primary-fixed-dim text-primary-container dark:text-on-primary-fixed font-label-sm text-xs px-2 py-1 rounded-full uppercase tracking-wide w-max hover:bg-primary hover:text-white transition-colors">
                          {post.category}{post.subCategory ? ` / ${post.subCategory}` : ''}
                        </span>
                      </Link>
                      <span className="text-secondary dark:text-secondary-fixed-dim font-body-sm text-xs">{getReadingTime(post.content)}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-headline-md text-lg font-semibold text-deep-navy dark:text-surface-white leading-tight group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: post.title }}>
                      </h3>
                    </Link>
                    <p className="font-body-md text-sm text-on-surface-variant dark:text-secondary-fixed-dim line-clamp-2 mt-2 flex-grow" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    <Link href={`/blog/${post.slug}`} className="text-primary font-body-md text-sm font-semibold mt-4 hover:underline flex items-center gap-1 group w-max">
                      Read Post
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Secondary Column (Sidebar) */}
      <aside className="lg:col-span-4 flex flex-col gap-8 md:gap-gutter">
        {/* Newsletter Signup */}
        <div className="bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary text-3xl" data-icon="mail">mail</span>
            <h3 className="font-headline-md text-xl font-bold text-deep-navy dark:text-surface-white">System Updates</h3>
          </div>
          <p className="font-body-md text-on-surface-variant dark:text-secondary-fixed-dim mb-6 text-sm">
            Subscribe to receive deep-dive technical articles, infrastructure updates, and exclusive hosting insights delivered directly to your inbox.
          </p>
          <form className="flex flex-col gap-3">
            <input
              className="w-full bg-surface-container-lowest dark:bg-inverse-surface border border-outline text-on-surface dark:text-surface-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md placeholder:text-secondary transition-all"
              placeholder="Enter your email address"
              required
              type="email"
            />
            <button
              className="w-full bg-primary hover:bg-primary-container text-white font-body-md font-medium py-3 rounded transition-colors duration-200 shadow-sm hover:shadow active:scale-95"
              type="button"
            >
              Subscribe Now
            </button>
            <p className="font-body-md text-xs text-secondary text-center mt-2">We respect your inbox. No spam.</p>
          </form>
        </div>

        {/* Sticky Sidebar Content */}
        <div className="sticky top-24 flex flex-col gap-8 md:gap-gutter">
          {/* Categories Widget */}
        <div className="bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-headline-md text-lg font-bold text-deep-navy dark:text-surface-white mb-4 border-b border-surface-variant dark:border-outline pb-2">Technical Categories</h3>
          <ul className="flex flex-col gap-2">
            {categories.slice(0, 7).map((cat) => (
              <li key={cat.name}>
                <Link href={`/category/${cat.name.toLowerCase().replaceAll(' ', '-')}`} className="flex justify-between items-center py-2 text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim font-body-md transition-colors group">
                  <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined text-sm">label_important</span> {cat.name}
                  </span> 
                  <span className="bg-surface-container-low dark:bg-inverse-surface px-2 py-0.5 rounded text-xs group-hover:bg-primary-container group-hover:text-white transition-colors">{cat.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Tags */}
        <div className="bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-headline-md text-lg font-bold text-deep-navy dark:text-surface-white mb-4 border-b border-surface-variant dark:border-outline pb-2">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <Link key={tag} href={`/category/${tag.toLowerCase().replaceAll(' ', '-')}`} className="bg-surface-container dark:bg-inverse-surface border border-outline-variant dark:border-outline text-secondary dark:text-secondary-fixed-dim font-label-sm px-3 py-1.5 rounded hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200">
                {tag}
              </Link>
            ))}
          </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
