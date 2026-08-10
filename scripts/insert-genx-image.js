const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const post = posts.find(p => p.slug === 'how-to-create-first-n8n-workflow');
if (post) {
  let newContent = post.content;
  
  // Find the exact line
  const targetLineSegment = 'Explore Gen X Web Hosting n8n Hosting';
  const imageHTML = `\n<figure class="wp-block-image size-large mt-8 mb-8"><img src="/images/blog/genx_n8n.png" alt="Gen X Web Hosting n8n Hosting" class="rounded-lg shadow-md w-full h-auto"/></figure>\n`;
  
  // We want to insert the image right after the </p> that closes this line.
  // We can do a regex replace:
  newContent = newContent.replace(/(👉.*?Explore Gen X Web Hosting n8n Hosting.*?<\/p>)/gi, `$1${imageHTML}`);

  post.content = newContent;
  
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
  console.log('Successfully added the genx_n8n image');
} else {
  console.log('Post not found');
}
