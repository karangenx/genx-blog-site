import Image from "next/image";
import Link from "next/link";
import postsData from "@/data/posts.json";

// Define subcategories for specific main categories
const categoryConfig: Record<string, { subcategories: { name: string; slug: string; icon: string; description: string }[] }> = {
  php: {
    subcategories: [
      { name: 'PHP Versions', slug: 'php-versions', icon: 'code', description: 'Guides and updates on various PHP versions.' },
      { name: 'Extensions', slug: 'php-extensions', icon: 'extension', description: 'Managing and installing PHP extensions.' },
      { name: 'Configuration', slug: 'php-config', icon: 'settings', description: 'Tuning php.ini and server configurations.' },
      { name: 'Optimization', slug: 'php-optimization', icon: 'speed', description: 'Performance optimization for PHP applications.' },
    ]
  },
  cpanel: {
    subcategories: [
      { name: 'Emails', slug: 'cpanel-emails', icon: 'mail', description: 'Managing email accounts and spam filters.' },
      { name: 'Databases', slug: 'cpanel-databases', icon: 'database', description: 'MySQL and PostgreSQL management.' },
      { name: 'File Manager', slug: 'cpanel-files', icon: 'folder', description: 'Managing files and permissions.' },
      { name: 'Backups', slug: 'cpanel-backups', icon: 'backup', description: 'Automated and manual backup strategies.' },
    ]
  }
};

export async function generateStaticParams() {
  const slugs = new Set<string>();
  postsData.forEach(p => {
    slugs.add(p.category.toLowerCase().replaceAll(' ', '-'));
    if (p.subCategory) {
      slugs.add(p.subCategory.toLowerCase().replaceAll(' ', '-'));
      // also add the combined slug as it's checked in the page logic
      slugs.add(`${p.category.toLowerCase().replaceAll(' ', '-')}-${p.subCategory.toLowerCase().replaceAll(' ', '-')}`);
    }
  });
  
  Object.keys(categoryConfig).forEach(mainCategorySlug => {
    slugs.add(mainCategorySlug);
    categoryConfig[mainCategorySlug].subcategories.forEach(sub => {
      slugs.add(sub.slug);
    });
  });

  return Array.from(slugs).map(slug => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Simple title casing for category name from slug
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const categoryPosts = postsData.filter(p => {
    const mainSlug = p.category.toLowerCase().replaceAll(' ', '-');
    if (mainSlug === slug) return true;
    
    if (p.subCategory) {
      const subSlug = p.subCategory.toLowerCase().replaceAll(' ', '-');
      if (subSlug === slug || `${mainSlug}-${subSlug}` === slug) {
        return true;
      }
    }
    return false;
  });

  const currentCategory = categoryConfig[slug.toLowerCase()];

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-edge py-12 md:py-section-gap">
      {/* Category Header */}
      <div className="mb-10 md:mb-16 border-b border-outline-variant pb-8 md:pb-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
          <span className="material-symbols-outlined text-primary text-[28px] md:text-[32px] filled" data-icon="category" data-weight="fill">category</span>
          <span className="font-label-sm text-xs md:text-label-sm text-secondary tracking-widest uppercase bg-[#EBF2F7] px-3 py-1 rounded-full">Category Archive</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-display-lg text-deep-navy dark:text-surface-white mb-4 md:mb-6">{categoryName}</h1>
        <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-3xl mx-auto md:mx-0">
          Explore all our articles related to {categoryName}. Deep dives, tutorials, and infrastructure updates.
        </p>
      </div>

      {/* Subcategories Grid */}
      {currentCategory && currentCategory.subcategories && (
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-deep-navy dark:text-surface-white mb-6">Subcategories in {categoryName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {currentCategory.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/${sub.slug}`}
                className="group block p-5 md:p-6 border border-outline-variant dark:border-outline rounded-lg bg-white dark:bg-surface-container hover:shadow-md hover:border-primary dark:hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#EBF2F7] dark:bg-surface-container-highest rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-xl">{sub.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-base md:text-lg font-semibold text-deep-navy dark:text-surface-white line-clamp-1">
                    {sub.name}
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant dark:text-secondary-fixed-dim line-clamp-2">
                  {sub.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Content Layout: Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter mb-12 md:mb-section-gap">
        {categoryPosts.length > 0 ? (
          categoryPosts.map((post, index) => (
            <article key={post.id} className={`${index === 0 ? 'md:col-span-8' : 'md:col-span-4'} bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300`}>
              <Link href={`/blog/${post.slug}`} className={`block relative w-full overflow-hidden bg-surface-container-low ${index === 0 ? 'h-56 md:h-80' : 'h-48 md:h-52'}`}>
                <div className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${post.imageUrl}')` }}></div>
                <div className="absolute top-4 left-4">
                  <span className="font-label-sm text-xs bg-[#EBF2F7] text-primary-container px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                    {post.category}{post.subCategory ? ` / ${post.subCategory}` : ''}
                  </span>
                </div>
              </Link>
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className={`${index === 0 ? 'font-headline-md md:font-headline-lg text-2xl md:text-headline-lg' : 'font-headline-md text-lg md:text-xl'} text-deep-navy dark:text-surface-white mb-3 md:mb-4 group-hover:text-primary transition-colors`} dangerouslySetInnerHTML={{ __html: post.title }}></h2>
                </Link>
                <p className={`font-body-md text-sm md:text-body-md text-on-surface-variant mb-6 ${index === 0 ? 'line-clamp-3' : 'line-clamp-2'}`} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                <div className="mt-auto flex items-center justify-between text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] md:text-[20px]" data-icon="calendar_month">calendar_month</span>
                    <span className="font-body-md text-xs md:text-sm">{post.date}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="font-body-md text-sm md:text-base text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <span className="hidden md:inline">Post</span> <span className="material-symbols-outlined text-[16px] md:text-[18px]" data-icon="arrow_forward">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="md:col-span-12 py-16 text-center bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">article</span>
            <p className="text-on-surface-variant font-body-lg text-lg">
              {!currentCategory || currentCategory.subcategories.length === 0 ? "No posts found in this category." : "Select a subcategory above to explore posts."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
