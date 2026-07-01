const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

// Find max ID
let maxId = 0;
posts.forEach(post => {
    const id = parseInt(post.id);
    if (!isNaN(id) && id > maxId) {
        maxId = id;
    }
});
const newId = (maxId + 1).toString();

const newContent = `
<p class="wp-block-paragraph">In today's digital-first world, email is more than just a communication tool—it's the backbone of business operations. From client communication to team collaboration, businesses need an email platform that is secure, reliable, and intelligent. That's where Nivi Email comes in.</p>
<p class="wp-block-paragraph">Nivi Email is a modern business email hosting solution designed to help professionals, startups, small businesses, and enterprises communicate more efficiently with the power of artificial intelligence and enterprise-grade security.</p>

<h2 class="wp-block-heading">Why Businesses Need a Better Email Solution</h2>
<p class="wp-block-paragraph">Traditional email services often lack advanced productivity features, strong security, and seamless collaboration tools. As businesses grow, these limitations can impact efficiency and data security.</p>
<p class="wp-block-paragraph">Nivi Email addresses these challenges by combining AI-powered productivity with secure email hosting, giving businesses everything they need in one platform.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">AI-Powered Productivity</h2>
<p class="wp-block-paragraph">One of the standout features of Nivi Email is its built-in artificial intelligence.</p>

<h3 class="wp-block-heading">AI Email Summaries</h3>
<p class="wp-block-paragraph">Long email threads can consume valuable time. Nivi Email automatically summarizes lengthy conversations, allowing users to quickly understand the context without reading every message.</p>

<h3 class="wp-block-heading">Magic Reply</h3>
<p class="wp-block-paragraph">Responding to emails becomes effortless with AI-generated reply suggestions. Whether you're replying to customers or colleagues, Magic Reply helps you create professional responses in seconds.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Enterprise-Grade Security</h2>
<p class="wp-block-paragraph">Business communication contains sensitive information that must remain protected. Nivi Email provides enterprise-level security features, including:</p>
<ul class="wp-block-list">
<li>End-to-end encryption</li>
<li>Advanced spam protection</li>
<li>Secure email storage</li>
<li>Data privacy protection</li>
<li>Reliable infrastructure</li>
</ul>
<p class="wp-block-paragraph">With these security measures, businesses can confidently communicate knowing their data is protected.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Designed for Team Collaboration</h2>
<p class="wp-block-paragraph">Modern businesses rely on collaboration to stay productive. Nivi Email includes collaboration features such as:</p>
<ul class="wp-block-list">
<li>Shared calendars</li>
<li>Contact management</li>
<li>Document integration</li>
<li>Team-friendly workspace</li>
</ul>
<p class="wp-block-paragraph">These tools make scheduling, communication, and project coordination much easier for growing teams.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Reliable Performance You Can Trust</h2>
<p class="wp-block-paragraph">Downtime can disrupt business operations and lead to missed opportunities. Nivi Email is built with reliability in mind and offers:</p>
<ul class="wp-block-list">
<li>99.99% uptime</li>
<li>256-bit encryption</li>
<li>24/7 customer support</li>
<li>Fast and dependable email delivery</li>
</ul>
<p class="wp-block-paragraph">This ensures businesses stay connected whenever communication matters most.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Affordable Pricing for Every Business</h2>
<p class="wp-block-paragraph">Nivi Email offers flexible pricing plans suitable for businesses of every size.</p>
<ul class="wp-block-list">
<li><strong>Starter Plan – ₹29/month:</strong> Ideal for freelancers and individuals looking for a professional business email solution.</li>
<li><strong>Business Plan – ₹59/month:</strong> Perfect for startups and small businesses that need more storage, better collaboration, and enhanced security.</li>
<li><strong>Premium Plan – ₹149/month:</strong> Designed for enterprises requiring advanced features, dedicated support, and larger storage capacity.</li>
</ul>
<p class="wp-block-paragraph">This affordable pricing makes professional email hosting accessible without compromising on quality or security.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Free Email Migration</h2>
<p class="wp-block-paragraph">Switching to a new email provider can often seem complicated. Nivi Email simplifies the entire process by offering free email migration.</p>
<p class="wp-block-paragraph">Businesses can migrate from popular platforms like:</p>
<ul class="wp-block-list">
<li>Google Workspace</li>
<li>Microsoft 365</li>
<li>Zoho Mail</li>
<li>cPanel Email</li>
</ul>
<p class="wp-block-paragraph">Migration is handled with:</p>
<ul class="wp-block-list">
<li>Zero downtime</li>
<li>No data loss</li>
<li>Expert technical assistance</li>
</ul>
<p class="wp-block-paragraph">This allows businesses to transition smoothly without interrupting daily operations.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Who Should Choose Nivi Email?</h2>
<p class="wp-block-paragraph">Nivi Email is an excellent choice for:</p>
<ul class="wp-block-list">
<li>Small businesses</li>
<li>Startups</li>
<li>Freelancers</li>
<li>Agencies</li>
<li>Corporate teams</li>
<li>Educational institutions</li>
<li>Enterprises</li>
</ul>
<p class="wp-block-paragraph">Whether you're managing a few email accounts or hundreds, Nivi Email scales with your business.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Why Choose Nivi Email?</h2>
<p class="wp-block-paragraph">Businesses choose Nivi Email because it combines everything needed for modern communication in one secure platform:</p>
<ul class="wp-block-list">
<li>AI-powered email management</li>
<li>Enterprise-grade security</li>
<li>Affordable monthly plans</li>
<li>Professional collaboration tools</li>
<li>Free migration services</li>
<li>Reliable uptime</li>
<li>24/7 customer support</li>
</ul>
<p class="wp-block-paragraph">Instead of juggling multiple tools, businesses can manage communication efficiently through one intelligent email platform.</p>

<hr class="wp-block-separator has-alpha-channel-opacity"/>

<h2 class="wp-block-heading">Final Thoughts</h2>
<p class="wp-block-paragraph">Email remains one of the most critical communication channels for every organization. Choosing the right email hosting provider can improve productivity, strengthen security, and simplify collaboration.</p>
<p class="wp-block-paragraph">Nivi Email delivers a modern, AI-powered email experience that helps businesses save time, protect sensitive information, and communicate more effectively. With affordable pricing, powerful AI features, enterprise-grade security, and free migration, it is an ideal solution for businesses looking to upgrade their email infrastructure.</p>
<p class="wp-block-paragraph">If you're ready to experience a smarter way to manage business email, Nivi Email is built to support your growth today and into the future.</p>
`;

const newPost = {
  id: newId,
  title: "Nivi Email: The Smart AI-Powered Business Email Solution for Modern Businesses",
  slug: "nivi-email-smart-ai-powered-business-solution",
  excerpt: "Nivi Email is a modern business email hosting solution designed to help professionals, startups, small businesses, and enterprises communicate more efficiently with the power of artificial intelligence and enterprise-grade security.",
  content: newContent,
  category: "Business Email",
  date: "Jul 1, 2026",
  imageUrl: "/images/blog/coverniviemail.png",
  featured: true
};

// Add to the top of the array
posts.unshift(newPost);

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Successfully added Nivi Email post!');
