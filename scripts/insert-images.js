const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

// Assuming the first post is the one we just added from the PDF
let content = posts[0].content;

// 1. Insert live chat widget image in "What is Nivi Chat?"
content = content.replace(
    '<h2 class="wp-block-heading">What is Nivi Chat?</h2>',
    '<h2 class="wp-block-heading">What is Nivi Chat?</h2>\n<figure class="wp-block-image size-large"><img src="/images/blog/live-chat-widget.png" alt="Nivi Chat Live Widget" style="width:100%;height:auto;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);margin-bottom:20px;"/></figure>'
);

// 2. Insert deploy image in "Deploy Your Chatbot in Minutes"
content = content.replace(
    '<h2 class="wp-block-heading">Deploy Your Chatbot in Minutes</h2>',
    '<h2 class="wp-block-heading">Deploy Your Chatbot in Minutes</h2>\n<figure class="wp-block-image size-large"><img src="/images/blog/embed-deploy.png" alt="Embed and Deploy Nivi Chat" style="width:100%;height:auto;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);margin-bottom:20px;"/></figure>'
);

// 3. Insert WhatsApp image in "WhatsApp Business Integration"
content = content.replace(
    '<h2 class="wp-block-heading">WhatsApp Business Integration</h2>',
    '<h2 class="wp-block-heading">WhatsApp Business Integration</h2>\n<figure class="wp-block-image size-large"><img src="/images/blog/whatsapp-integration.png" alt="WhatsApp Business Integration" style="width:100%;height:auto;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);margin-bottom:20px;"/></figure>'
);

// 4. Insert Dashboard image in "Powerful Dashboard & Analytics"
content = content.replace(
    '<h2 class="wp-block-heading">Powerful Dashboard & Analytics</h2>',
    '<h2 class="wp-block-heading">Powerful Dashboard & Analytics</h2>\n<figure class="wp-block-image size-large"><img src="/images/blog/overview-dashboard.png" alt="Nivi Chat Overview Dashboard" style="width:100%;height:auto;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);margin-bottom:20px;"/></figure>'
);

posts[0].content = content;

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Images added successfully!');
