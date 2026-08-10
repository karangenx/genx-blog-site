const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const post = posts.find(p => p.slug === 'how-to-create-first-n8n-workflow');
if (post) {
  const linkString = '<a href="https://genxwhosting.com/pages/n8n-hosting.php" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline decoration-2 underline-offset-2">managed n8n hosting</a>';
  const linkString2 = '<a href="https://genxwhosting.com/pages/n8n-hosting.php" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline decoration-2 underline-offset-2">n8n hosting</a>';
  
  let newContent = post.content;
  
  // Replace instances of 'managed n8n hosting'
  newContent = newContent.replace(/(?<!>)managed n8n hosting(?!<\/a>)/gi, linkString);

  // Replace instances of 'n8n hosting' that are not already part of the previous replacement or existing link
  newContent = newContent.replace(/(?<!>|managed )n8n hosting(?!<\/a>)/gi, linkString2);

  post.content = newContent;
  
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
  console.log('Successfully updated the links for n8n hosting');
} else {
  console.log('Post not found');
}
