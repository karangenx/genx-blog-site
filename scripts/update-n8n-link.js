const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

// Find the post
const postIndex = posts.findIndex(p => p.slug === 'n8n-vs-zapier-self-hosting-saves-money');

if (postIndex !== -1) {
    let content = posts[postIndex].content;
    
    // Create the replacement link with inline style for no underline
    const linkCode = '<a href="https://genxwhosting.com/pages/n8n-hosting.php" style="text-decoration: none; color: inherit;" target="_blank" rel="noopener noreferrer">n8n</a>';

    // Replace specific instances carefully to avoid breaking HTML attributes
    // 1. <strong>n8n</strong>
    content = content.replace(/<strong>n8n<\/strong>/g, `<strong>${linkCode}</strong>`);
    
    // 2. n8n (pronounced
    content = content.replace(/n8n \(pronounced/g, `${linkCode} (pronounced`);

    // 3. self-hosting n8n
    content = content.replace(/self-hosting n8n/g, `self-hosting ${linkCode}`);
    
    // 4. self-hosted n8n
    content = content.replace(/self-hosted n8n/g, `self-hosted ${linkCode}`);

    // 5. With n8n running
    content = content.replace(/With n8n running/g, `With ${linkCode} running`);

    // 6. n8n is designed
    content = content.replace(/n8n is designed/g, `${linkCode} is designed`);

    // 7. n8n is ideal
    content = content.replace(/n8n is ideal/g, `${linkCode} is ideal`);

    // 8. n8n vs Zapier
    content = content.replace(/n8n vs Zapier/g, `${linkCode} vs Zapier`);

    // 9. deploy n8n
    content = content.replace(/deploy <strong>n8n<\/strong>/g, `deploy <strong>${linkCode}</strong>`);
    content = content.replace(/deploy n8n/g, `deploy ${linkCode}`);
    
    // 10. n8n vs Zapier: Feature Comparison
    // We already replaced "n8n vs Zapier" but if it was in a heading it's ok.
    
    // Let's replace the first column in the table if it's there
    content = content.replace(/<th>n8n<\/th>/g, `<th>${linkCode}</th>`);

    posts[postIndex].content = content;

    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
    console.log('Successfully updated n8n links in the post.');
} else {
    console.log('Post not found!');
}
