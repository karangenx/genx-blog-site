const fs = require('fs');
const path = require('path');

const API_URL = 'https://blog.genxwhosting.com/wp-json/wp/v2';

const postsToFetch = [
  // 1. Domain
  { slug: 'domain', category: 'Domain' },
  // 2. Wordpress
  { slug: '6-best-wordpress-security-plugins-to-protect-your-site', category: 'WordPress' },
  { slug: '8-best-wordpress-backup-plugins-for-2024', category: 'WordPress' },
  { slug: 'which-is-best-elementor-and-divi', category: 'WordPress' },
  { slug: 'how-to-optimize-images-for-wordpress', category: 'WordPress' },
  { slug: 'what-is-wordpress', category: 'WordPress' },
  // 3. php
  { slug: '10-php-extensions-you-need-to-know', category: 'PHP', subCategory: 'Extensions' },
  { slug: '5-php-errors-you-must-know-how-to-resolve-it', category: 'PHP' },
  { slug: 'what-is-php-drawbacks-and-applications', category: 'PHP' },
  // 4. cpanel
  { slug: 'how-to-link-a-business-account-to-a-gmail-account', category: 'cPanel', subCategory: 'Emails' },
  { slug: 'what-is-cpanel-and-how-is-best-for-blogsite', category: 'cPanel' },
  { slug: 'create-email-account-in-cpanel', category: 'cPanel', subCategory: 'Emails' },
  { slug: 'how-to-create-database-and-user-in-cpanel', category: 'cPanel', subCategory: 'Databases' },
  { slug: 'describe-cpanel-cons-and-benefits-how-to-apply-it', category: 'cPanel' },
  // 6. SSL certificate
  { slug: 'how-to-protect-your-website-7-essential-website-security-tips', category: 'SSL Certificate' },
  { slug: 'what-is-ssl-secure-socket-layer', category: 'SSL Certificate' },
  // 7. Web Hosting Tips
  { slug: 'dangerous-site', category: 'Web Hosting Tips' },
  { slug: 'shared-vs-vps-hosting', category: 'Web Hosting Tips' },
  { slug: 'best-retail-location-pos-modules-for-woocommerce', category: 'Web Hosting Tips' },
  // 8. Page Speed
  { slug: 'what-is-page-speed', category: 'Page Speed' }
];

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

async function fetchPost(slug, targetCategory, targetSubCategory) {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    
    if (data.length === 0) {
      console.warn(`Post not found for slug: ${slug}`);
      return null;
    }

    const post = data[0];
    
    let imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnf6Q1YEzl8tHczfiuVUXM-XuAEWe_D-gHq3MuT3lgovpv2858cZfN8fhVdJZnTpSv1salDxWnrpTucVnPLy0AkLO4ZqREs3Kaeo0FW25tQvPzMinsVROZNAyHYFCD_EneXCIf8ax51Kk2hcfmBMXunHyDo8IjWVGAIhmxXOQfCBP-tfZD5wKekrOWV-mOILd2vvU1DPftf-RP_b15kmieQqcN3Qno9xCC4JO87h0STmcsKQYvoac9mrOVGNjLfOqK9xeW2wORXXO2'; // Default placeholder
    
    if (post.featured_media) {
      try {
        const mediaRes = await fetch(`${API_URL}/media/${post.featured_media}`);
        if (mediaRes.ok) {
          const media = await mediaRes.json();
          imageUrl = media.source_url;
        }
      } catch (e) {
        console.error(`Failed to fetch media for post ${post.id}`);
      }
    }

    return {
      id: post.id.toString(),
      title: post.title.rendered,
      slug: post.slug,
      excerpt: stripHtml(post.excerpt.rendered).substring(0, 150) + '...',
      content: post.content.rendered,
      category: targetCategory,
      ...(targetSubCategory && { subCategory: targetSubCategory }),
      date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      imageUrl: imageUrl,
      featured: false
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error.message);
    return null;
  }
}

async function run() {
  console.log('Fetching specific posts...');
  const results = [];
  
  for (let i = 0; i < postsToFetch.length; i++) {
    const item = postsToFetch[i];
    console.log(`[${i+1}/${postsToFetch.length}] Fetching ${item.slug}...`);
    const post = await fetchPost(item.slug, item.category, item.subCategory);
    if (post) {
      if (results.length === 0) post.featured = true; // Make first post featured
      results.push(post);
    }
  }

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nSuccessfully saved ${results.length} posts to ${outputPath}`);
}

run();
