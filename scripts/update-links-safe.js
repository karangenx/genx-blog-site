const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const postIndex = posts.findIndex(p => p.slug === 'n8n-vs-zapier-self-hosting-saves-money');

if (postIndex !== -1) {
    let content = posts[postIndex].content;
    
    // First, remove all existing n8n, VPS, Gen X Web Hosting links to have a clean slate.
    const dom = new JSDOM(content);
    const document = dom.window.document;
    
    // Convert links back to text if they match our target links
    const links = document.querySelectorAll('a');
    links.forEach(a => {
        if (a.href.includes('n8n-hosting.php') || a.href.includes('nodex.php') || a.href === 'https://genxwhosting.com/') {
            const text = document.createTextNode(a.textContent);
            a.parentNode.replaceChild(text, a);
        }
    });

    // Now we traverse the DOM and only modify text nodes inside specific tags (p, li)
    const walker = document.createTreeWalker(document.body, dom.window.NodeFilter.SHOW_TEXT, null, false);
    
    const nodesToReplace = [];
    let node;
    while (node = walker.nextNode()) {
        // Check if parent is a valid tag for linking
        let parent = node.parentNode;
        let isValid = false;
        let isInvalid = false;
        
        let curr = parent;
        while (curr && curr !== document.body) {
            const tag = curr.tagName.toLowerCase();
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'th', 'td', 'a', 'strong'].includes(tag)) {
                // We'll allow replacing inside <strong>, but block headings, tables, links
                if (tag !== 'strong') {
                    isInvalid = true;
                    break;
                }
            }
            if (['p', 'li'].includes(tag)) {
                isValid = true;
            }
            curr = curr.parentNode;
        }

        if (isValid && !isInvalid) {
            nodesToReplace.push(node);
        }
    }

    nodesToReplace.forEach(node => {
        let text = node.nodeValue;
        
        const replacements = [
            { word: 'n8n', url: 'https://genxwhosting.com/pages/n8n-hosting.php' },
            { word: 'VPS', url: 'https://genxwhosting.com/pages/nodex.php?type=linux-virtual-cloud' },
            { word: 'Gen X Web Hosting', url: 'https://genxwhosting.com/' }
        ];

        let html = text;
        let changed = false;
        
        replacements.forEach(({ word, url }) => {
            const splitRegex = new RegExp(`\\b${word}\\b`, 'g');
            if (splitRegex.test(html)) {
                html = html.replace(splitRegex, `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline decoration-2 underline-offset-2">${word}</a>`);
                changed = true;
            }
        });
        
        if (changed) {
            const span = document.createElement('span');
            span.innerHTML = html;
            while (span.firstChild) {
                node.parentNode.insertBefore(span.firstChild, node);
            }
            node.parentNode.removeChild(node);
        }
    });

    posts[postIndex].content = document.body.innerHTML;

    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
    console.log('Successfully updated links safely in the post.');
} else {
    console.log('Post not found!');
}
