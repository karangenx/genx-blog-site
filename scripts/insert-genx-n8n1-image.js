const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const post = posts.find(p => p.slug === 'how-to-create-first-n8n-workflow');
if (post) {
  let newContent = post.content;
  
  const searchStr = '<h2 class="wp-block-heading">Step 10: Use Webhooks in n8n</h2>';
  const replaceStr = '<h2 class="wp-block-heading">Step 10: Use Webhooks in n8n</h2>\n<figure class="wp-block-image size-large mt-8 mb-8"><img src="/images/blog/genx_n8n1.png" alt="Use Webhooks in n8n" class="rounded-lg shadow-md w-full h-auto"/></figure>';
  
  newContent = newContent.replace(searchStr, replaceStr);

  post.content = newContent;
  
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
  console.log('Successfully added genx_n8n1 image');
} else {
  console.log('Post not found');
}
