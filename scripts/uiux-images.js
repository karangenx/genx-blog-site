const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
let postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

const premiumLandscapeStyle = 'style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);border:1px solid rgba(0,0,0,0.05);margin:40px auto 32px;display:block;transition:transform 0.3s ease;"';
const premiumPortraitStyle = 'style="max-width:320px;width:100%;height:auto;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0, 0, 0, 0.25);border:1px solid rgba(0,0,0,0.08);margin:48px auto 40px;display:block;transition:transform 0.3s ease;"';

// We will use regex to find the img tags and replace their styles.
posts.forEach(post => {
    if (post.slug && post.slug.includes('nivi-chat')) {
        
        // Fix landscape images (Embed, WhatsApp, Overview)
        post.content = post.content.replace(
            /<img src="\/images\/blog\/Embed%20and%20Deploy%20Image\.png"[^>]*>/g,
            `<img src="/images/blog/Embed%20and%20Deploy%20Image.png" alt="Embed and Deploy Nivi Chat" ${premiumLandscapeStyle}/>`
        );
        post.content = post.content.replace(
            /<img src="\/images\/blog\/WhatsApp%20Integration%20Image\.png"[^>]*>/g,
            `<img src="/images/blog/WhatsApp%20Integration%20Image.png" alt="WhatsApp Business Integration" ${premiumLandscapeStyle}/>`
        );
        post.content = post.content.replace(
            /<img src="\/images\/blog\/Overview%20Dashboard%20Image\.png"[^>]*>/g,
            `<img src="/images/blog/Overview%20Dashboard%20Image.png" alt="Nivi Chat Overview Dashboard" ${premiumLandscapeStyle}/>`
        );

        // Fix portrait image (Live Chat Widget)
        post.content = post.content.replace(
            /<img src="\/images\/blog\/Live%20Chat%20Widget%20Image\.png"[^>]*>/g,
            `<img src="/images/blog/Live%20Chat%20Widget%20Image.png" alt="Nivi Chat Live Widget" ${premiumPortraitStyle}/>`
        );
        
        // In the second post there might be different wording, but we already fixed the src paths earlier.
        // Let's ensure the figure tag itself doesn't have weird margins if WordPress classes are interfering
        post.content = post.content.replace(/<figure class="wp-block-image size-large">/g, '<figure class="wp-block-image size-large" style="margin: 0; padding: 0;">');
    }
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('UI/UX Image styles applied!');
