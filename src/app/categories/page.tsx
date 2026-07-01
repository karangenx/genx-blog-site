import React from 'react';
import Link from 'next/link';

const allCategories = [
  { name: 'AI Chatbots', slug: 'ai-chatbots', icon: 'smart_toy', description: 'AI chatbot platforms and implementation.' },
  { name: 'Business Email', slug: 'business-email', icon: 'mail', description: 'Business email hosting and solutions.' },
  { name: 'Hosting News', slug: 'hosting-news', icon: 'newspaper', description: 'Latest updates and announcements.' },
  { name: 'Security', slug: 'security', icon: 'security', description: 'Best practices to secure your infrastructure.' },
  { name: 'Hardware', slug: 'hardware', icon: 'memory', description: 'Server hardware and performance benchmarks.' },
  { name: 'Cloud', slug: 'cloud', icon: 'cloud', description: 'Cloud architecture and scaling strategies.' },
  { name: 'Tutorials', slug: 'tutorials', icon: 'school', description: 'Step-by-step guides and how-tos.' },
  { name: 'cPanel', slug: 'cpanel', icon: 'admin_panel_settings', description: 'Managing servers with cPanel & WHM.' },
  { name: 'PHP', slug: 'php', icon: 'code', description: 'PHP configuration, tuning, and optimization.' },
  { name: 'Domain', slug: 'domain', icon: 'language', description: 'Domain registration, DNS, and management.' },
  { name: 'WordPress', slug: 'wordpress', icon: 'web', description: 'WordPress hosting, themes, and plugins.' },
  { name: 'Linux', slug: 'linux', icon: 'terminal', description: 'Linux system administration and commands.' },
  { name: 'Windows', slug: 'windows', icon: 'desktop_windows', description: 'Windows Server and IIS configuration.' },
  { name: 'Databases', slug: 'databases', icon: 'database', description: 'MySQL, PostgreSQL, and NoSQL databases.' },
  { name: 'SSL Certificate', slug: 'ssl-certificate', icon: 'lock', description: 'Securing your site with SSL certificates.' },
  { name: 'Web Hosting Tips', slug: 'web-hosting-tips', icon: 'tips_and_updates', description: 'Advice for managing web hosting.' },
  { name: 'Page Speed', slug: 'page-speed', icon: 'speed', description: 'Optimizing load times and performance.' },
];

export default function CategoriesPage() {
  return (
    <main className="flex-1 bg-surface-white dark:bg-deep-navy">
      <div className="py-12 px-margin-edge max-w-container-max mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface dark:text-surface-white mb-4">
            Technical Categories
          </h1>
          <p className="text-lg text-on-surface-variant dark:text-secondary-fixed-dim max-w-2xl">
            Browse our extensive knowledge base and blog topics. Everything from basic setup to advanced server configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCategories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/category/${category.slug}`}
              className="group block p-6 border border-outline-variant dark:border-on-surface-variant rounded-lg bg-white dark:bg-surface-container hover:shadow-md hover:border-primary dark:hover:border-primary transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest dark:bg-surface-container-highest rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined">{category.icon}</span>
                </div>
                <h3 className="font-headline-md text-xl font-semibold text-deep-navy dark:text-surface-white">
                  {category.name}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant dark:text-secondary-fixed-dim">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
