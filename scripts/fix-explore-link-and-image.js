const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const post = posts.find(p => p.slug === 'how-to-create-first-n8n-workflow');
if (post) {
  let newContent = post.content;
  
  // 1. Fix "managed n8n hosting" inside <strong>
  newContent = newContent.replace(
    /<strong>managed n8n hosting<\/strong>/g,
    '<strong><a href="https://genxwhosting.com/pages/n8n-hosting.php" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline decoration-2 underline-offset-2">managed n8n hosting</a></strong>'
  );

  // 2. Fix the nested a tags and insert image
  const brokenExploreStr = '👉 <strong><a href="https://genxwhosting.com/pages/n8n-hosting.php" target="_blank" rel="noopener noreferrer">Explore <a href="https://genxwhosting.com/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline decoration-2 underline-offset-2">Gen X Web Hosting</a> n8n Hosting</a></strong></p>';
  
  const fixedExploreStr = '👉 <strong><a href="https://genxwhosting.com/pages/n8n-hosting.php" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline decoration-2 underline-offset-2">Explore Gen X Web Hosting n8n Hosting</a></strong></p>\n<figure class="wp-block-image size-large mt-8 mb-8"><img src="/images/blog/genx_n8n.png" alt="Gen X Web Hosting n8n Hosting" class="rounded-lg shadow-md w-full h-auto"/></figure>';
  
  newContent = newContent.replace(brokenExploreStr, fixedExploreStr);

  post.content = newContent;
  
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
  console.log('Successfully fixed links and added image');
} else {
  console.log('Post not found');
}
