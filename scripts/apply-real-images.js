const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

// Fix the PDF post
if (posts[0].id) {
    posts[0].imageUrl = "/images/blog/covernivi.png";
    
    posts[0].content = posts[0].content.replace(
        /https:\/\/placehold\.co\/800x400\/e2e8f0\/475569\?text=Live\+Chat\+Widget\+Image/g,
        '/images/blog/Live%20Chat%20Widget%20Image.png'
    );
    posts[0].content = posts[0].content.replace(
        /https:\/\/placehold\.co\/800x400\/e2e8f0\/475569\?text=Embed\+and\+Deploy\+Image/g,
        '/images/blog/Embed%20and%20Deploy%20Image.png'
    );
    posts[0].content = posts[0].content.replace(
        /https:\/\/placehold\.co\/800x400\/e2e8f0\/475569\?text=WhatsApp\+Integration\+Image/g,
        '/images/blog/WhatsApp%20Integration%20Image.png'
    );
    posts[0].content = posts[0].content.replace(
        /https:\/\/placehold\.co\/800x400\/e2e8f0\/475569\?text=Overview\+Dashboard\+Image/g,
        '/images/blog/Overview%20Dashboard%20Image.png'
    );
}

// Fix the draft post (the second one)
if (posts[1].id && posts[1].slug.includes("nivi-chat")) {
    posts[1].imageUrl = "/images/blog/covernivi.png";
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Fixed real images and cover!');
