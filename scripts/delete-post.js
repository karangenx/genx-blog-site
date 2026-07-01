const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
let posts = JSON.parse(postsData);

// Filter out the blog post titled "Revolutionize Your Customer Support with Nivi Chat: A Complete Guide"
const initialLength = posts.length;
posts = posts.filter(post => post.title !== "Revolutionize Your Customer Support with Nivi Chat: A Complete Guide");

if (posts.length < initialLength) {
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    console.log('Successfully deleted the blog post!');
} else {
    console.log('Blog post not found.');
}
