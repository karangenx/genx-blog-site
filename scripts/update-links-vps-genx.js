const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const postIndex = posts.findIndex(p => p.slug === 'n8n-vs-zapier-self-hosting-saves-money');

if (postIndex !== -1) {
    let content = posts[postIndex].content;
    
    // 1. Highlight n8n link
    // Replace inline styles that hide the link with classes that highlight it
    content = content.replace(/style="text-decoration: none; color: inherit;"/g, 'class="text-primary font-bold underline decoration-2 underline-offset-2"');
    
    // 2. Add VPS links
    // First, let's temporarily replace existing links to avoid nested links
    let tempContent = content;
    
    // Function to safely replace text not inside HTML tags
    const safeReplace = (text, targetWord, newCode) => {
        // Split by HTML tags
        const parts = text.split(/(<[^>]*>)/);
        let inLink = false;
        
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].startsWith('<a ')) {
                inLink = true;
            } else if (parts[i].startsWith('</a>')) {
                inLink = false;
            } else if (!parts[i].startsWith('<') && !inLink) {
                // We are in text nodes and not inside an anchor tag
                const regex = new RegExp(`\\b${targetWord}\\b`, 'g');
                parts[i] = parts[i].replace(regex, newCode);
            }
        }
        return parts.join('');
    };

    content = safeReplace(content, 'VPS', '<a href="https://genxwhosting.com/pages/nodex.php?type=linux-virtual-cloud" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline">VPS</a>');
    content = safeReplace(content, 'Gen X Web Hosting', '<a href="https://genxwhosting.com/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline">Gen X Web Hosting</a>');

    posts[postIndex].content = content;

    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
    console.log('Successfully updated VPS, Gen X Web Hosting, and n8n links in the post.');
} else {
    console.log('Post not found!');
}
