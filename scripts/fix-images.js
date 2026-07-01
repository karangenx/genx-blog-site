const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

// Fix the PDF post
if (posts[0].id) {
    // Replace the main hero image with an existing generic image so it doesn't break
    posts[0].imageUrl = "/images/blog/search-engine-marketing-collage-1-1-scaled.jpg";
    
    // Replace the inline images with placeholder image service URLs
    posts[0].content = posts[0].content.replace(
        /\/images\/blog\/live-chat-widget\.png/g,
        'https://placehold.co/800x400/e2e8f0/475569?text=Live+Chat+Widget+Image'
    );
    posts[0].content = posts[0].content.replace(
        /\/images\/blog\/embed-deploy\.png/g,
        'https://placehold.co/800x400/e2e8f0/475569?text=Embed+and+Deploy+Image'
    );
    posts[0].content = posts[0].content.replace(
        /\/images\/blog\/whatsapp-integration\.png/g,
        'https://placehold.co/800x400/e2e8f0/475569?text=WhatsApp+Integration+Image'
    );
    posts[0].content = posts[0].content.replace(
        /\/images\/blog\/overview-dashboard\.png/g,
        'https://placehold.co/800x400/e2e8f0/475569?text=Overview+Dashboard+Image'
    );
}

// Fix the draft post (the second one)
if (posts[1].id) {
    posts[1].imageUrl = "/images/blog/search-engine-marketing-collage-1-1-scaled.jpg";
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Fixed broken images with placeholders!');
