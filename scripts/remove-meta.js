const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('./src/data/posts.json'));
const p = posts.find(p => p.slug === 'complete-guide-to-ai-chatbots-nivi-chat');
const regex = /<p class="wp-block-paragraph"><strong>Meta Title:[\s\S]*?<p class="wp-block-paragraph"><strong>Meta Description:[\s\S]*?<\/p>\n\n/g;
p.content = p.content.replace(regex, '');
fs.writeFileSync('./src/data/posts.json', JSON.stringify(posts, null, 2));
