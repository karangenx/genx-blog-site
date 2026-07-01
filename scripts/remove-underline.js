const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
let postsData = fs.readFileSync(postsPath, 'utf8');

// Replace the underline style with text-decoration: none
postsData = postsData.replace(/text-decoration: underline;/g, 'text-decoration: none;');

fs.writeFileSync(postsPath, postsData);
console.log('Underlines removed!');
