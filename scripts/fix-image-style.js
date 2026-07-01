const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

if (posts[0].id) {
    // Replace the style for the Live Chat Widget to prevent it from being too wide and overlapping
    posts[0].content = posts[0].content.replace(
        /style="width:100%;height:auto;border-radius:8px;box-shadow:0 4px 6px rgba\(0,0,0,0\.1\);margin-bottom:20px;"/g,
        'style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);margin:20px auto;display:block;"'
    );
    
    // For the Live Chat Widget specifically, since it's portrait, let's give it a max-width of 400px
    posts[0].content = posts[0].content.replace(
        /<img src="\/images\/blog\/Live%20Chat%20Widget%20Image\.png" alt="Nivi Chat Live Widget" style="max-width:100%;/g,
        '<img src="/images/blog/Live%20Chat%20Widget%20Image.png" alt="Nivi Chat Live Widget" style="max-width:400px;'
    );
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Fixed image styling!');
