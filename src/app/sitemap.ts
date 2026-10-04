import { MetadataRoute } from 'next';
import postsData from '@/data/posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog.genxwhosting.com';

  // Real static pages only
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2026-08-10'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date('2026-08-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories/`,
      lastModified: new Date('2026-08-10'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Blog posts only (no attachments, tags, or author archives)
  const postEntries: MetadataRoute.Sitemap = postsData.map((post) => {
    let postDate = new Date();
    try {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) {
        postDate = parsed;
      }
    } catch {
      // Fallback
    }

    return {
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: postDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...staticPages, ...postEntries];
}
