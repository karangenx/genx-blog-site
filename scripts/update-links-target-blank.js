const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const post = posts.find(p => p.slug === 'how-to-create-first-n8n-workflow');
if (post) {
  let newContent = post.content;
  
  // Replace links that don't have target="_blank" with target="_blank" rel="noopener noreferrer"
  // Specifically targeting links to genxwhosting.com
  newContent = newContent.replace(/<a href="(https:\/\/genxwhosting\.com[^"]*)"(?! target="_blank")/gi, '<a href="$1" target="_blank" rel="noopener noreferrer"');
  
  // Update classes just in case they don't have them
  newContent = newContent.replace(/<a href="(https:\/\/genxwhosting\.com[^"]*)" target="_blank" rel="noopener noreferrer">(.*?)<\/a>/gi, (match, url, text) => {
     if (!match.includes('class=')) {
         return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline decoration-2 underline-offset-2">${text}</a>`;
     }
     return match;
  });

  post.content = newContent;
  
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
  console.log('Successfully added target="_blank" to all links');
} else {
  console.log('Post not found');
}
