const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const postIndex = posts.findIndex(p => p.slug === 'n8n-vs-zapier-self-hosting-saves-money');
if (postIndex !== -1) {
    posts[postIndex].imageUrl = '/images/blog/n8n_vs_zap.png';
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
    console.log('Image URL updated successfully.');
} else {
    console.log('Post not found.');
}
