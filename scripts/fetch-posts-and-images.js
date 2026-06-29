const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const API_URL = 'https://blogo.genxwhosting.com/wp-json/wp/v2';
const PUBLIC_IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'blog');

// Ensure directory exists
if (!fs.existsSync(PUBLIC_IMG_DIR)) {
  fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
}

// Ignore self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const postsToFetch = [
  { slug: 'domain', category: 'Domain' },
  { slug: '6-best-wordpress-security-plugins-to-protect-your-site', category: 'WordPress' },
  { slug: '8-best-wordpress-backup-plugins-for-2024', category: 'WordPress' },
  { slug: 'which-is-best-elementor-and-divi', category: 'WordPress' },
  { slug: 'how-to-optimize-images-for-wordpress', category: 'WordPress' },
  { slug: 'what-is-wordpress', category: 'WordPress' },
  { slug: '10-php-extensions-you-need-to-know', category: 'PHP', subCategory: 'Extensions' },
  { slug: '5-php-errors-you-must-know-how-to-resolve-it', category: 'PHP' },
  { slug: 'what-is-php-drawbacks-and-applications', category: 'PHP' },
  { slug: 'how-to-link-a-business-account-to-a-gmail-account', category: 'cPanel', subCategory: 'Emails' },
  { slug: 'what-is-cpanel-and-how-is-best-for-blogsite', category: 'cPanel' },
  { slug: 'create-email-account-in-cpanel', category: 'cPanel', subCategory: 'Emails' },
  { slug: 'how-to-create-database-and-user-in-cpanel', category: 'cPanel', subCategory: 'Databases' },
  { slug: 'describe-cpanel-cons-and-benefits-how-to-apply-it', category: 'cPanel' },
  { slug: 'how-to-protect-your-website-7-essential-website-security-tips', category: 'SSL Certificate' },
  { slug: 'what-is-ssl-secure-socket-layer', category: 'SSL Certificate' },
  { slug: 'dangerous-site', category: 'Web Hosting Tips' },
  { slug: 'shared-vs-vps-hosting', category: 'Web Hosting Tips' },
  { slug: 'best-retail-location-pos-modules-for-woocommerce', category: 'Web Hosting Tips' },
  { slug: 'what-is-page-speed', category: 'Page Speed' }
];

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

async function downloadMedia(url) {
  if (!url || url.startsWith('data:')) return url;
  
  try {
    const urlObj = new URL(url);
    const filename = path.basename(urlObj.pathname);
    if (!filename) return url;

    const localPath = path.join(PUBLIC_IMG_DIR, filename);
    const relativeUrl = `/images/blog/${filename}`;

    if (fs.existsSync(localPath)) {
      return relativeUrl;
    }

    console.log(`Downloading media: ${url}`);
    
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      client.get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          return resolve(downloadMedia(response.headers.location)); // follow redirect
        }
        if (response.statusCode !== 200) {
          console.error(`Failed to download ${url}: HTTP ${response.statusCode}`);
          return resolve(url);
        }
        const fileStream = fs.createWriteStream(localPath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(relativeUrl);
        });
      }).on('error', (err) => {
        console.error(`Error downloading ${url}:`, err.message);
        resolve(url);
      });
    });
  } catch (e) {
    console.error(`Invalid URL: ${url}`);
    return url;
  }
}

async function processHtmlMedia(html) {
  let processedHtml = html;
  
  // Remove all srcset attributes so they don't override the main downloaded src URL
  processedHtml = processedHtml.replace(/srcset="([^">]+)"/g, '');
  
  const mediaRegex = /<(?:img|audio|source|video)[^>]+src="([^">]+)"/g;
  let match;
  const promises = [];
  
  while ((match = mediaRegex.exec(html)) !== null) {
    const originalUrl = match[1];
    promises.push({
      original: originalUrl,
      newUrlPromise: downloadMedia(originalUrl)
    });
  }

  for (const item of promises) {
    const newUrl = await item.newUrlPromise;
    // Replace all occurrences of the original URL with the new URL
    processedHtml = processedHtml.split(item.original).join(newUrl);
  }
  
  return processedHtml;
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
    
    // REPLACE old domain with new domain BEFORE doing anything else
    let rawContent = post.content.rendered.replace(/https:\/\/blog\.genxwhosting\.com/g, 'https://blogo.genxwhosting.com');
    let rawExcerpt = post.excerpt.rendered.replace(/https:\/\/blog\.genxwhosting\.com/g, 'https://blogo.genxwhosting.com');
    
    let imageUrl = '';
    
    if (post.featured_media) {
      try {
        const mediaRes = await fetch(`${API_URL}/media/${post.featured_media}`);
        if (mediaRes.ok) {
          const media = await mediaRes.json();
          imageUrl = media.source_url.replace(/https:\/\/blog\.genxwhosting\.com/g, 'https://blogo.genxwhosting.com');
        }
      } catch (e) {
        console.error(`Failed to fetch media for post ${post.id}`);
      }
    }

    if (imageUrl) {
      imageUrl = await downloadMedia(imageUrl);
    }

    const contentHtml = await processHtmlMedia(rawContent);

    return {
      id: post.id.toString(),
      title: post.title.rendered,
      slug: post.slug,
      excerpt: stripHtml(rawExcerpt).substring(0, 150) + '...',
      content: contentHtml,
      category: targetCategory,
      ...(targetSubCategory && { subCategory: targetSubCategory }),
      date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      imageUrl: imageUrl || '/images/blog/default.jpg',
      featured: false
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error.message);
    return null;
  }
}

async function run() {
  console.log('Fetching specific posts and downloading media (images and audio)...');
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
