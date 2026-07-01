const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

function addLinksToText(htmlContent) {
    // A trick to replace text outside of HTML tags.
    // We split by HTML tags, and only replace in the text nodes.
    const parts = htmlContent.split(/(<[^>]*>)/);
    for (let i = 0; i < parts.length; i++) {
        // Even indices are text outside tags, odd indices are HTML tags
        if (i % 2 === 0) {
            // Replace "Nivi Chat" with a link
            parts[i] = parts[i].replace(/Nivi Chat/g, '<a href="https://nivichat.in" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Nivi Chat</a>');
        }
    }
    return parts.join('');
}

if (posts[0].id && posts[0].slug.includes('nivi-chat')) {
    posts[0].content = addLinksToText(posts[0].content);
}

if (posts[1].id && posts[1].slug.includes('nivi-chat')) {
    posts[1].content = addLinksToText(posts[1].content);
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Links added successfully!');
