const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(postsData);

// Find max ID
let maxId = 0;
posts.forEach(post => {
    const id = parseInt(post.id);
    if (id > maxId) maxId = id;
});

const newId = (maxId + 1).toString();

const content = `
<p class="wp-block-paragraph"><strong>Meta Title:</strong> Train an AI Chatbot with Your Business Data | Complete Guide to Nivi Chat</p>
<p class="wp-block-paragraph"><strong>Meta Description:</strong> Discover how to build an AI chatbot trained on your website, PDFs, YouTube videos, FAQs, and custom data using Nivi Chat. Automate customer support, generate more leads, and grow your business with AI.</p>

<h2 class="wp-block-heading">The Future of Customer Support is AI</h2>
<p class="wp-block-paragraph">Customer expectations have changed dramatically over the last few years. People no longer want to wait hours—or even minutes—for answers. Whether they're shopping online, booking a service, or simply exploring your website, they expect instant, accurate, and helpful responses at any time of the day.</p>
<p class="wp-block-paragraph">Unfortunately, many businesses still rely on traditional customer support methods that struggle to keep up. Support teams can only work during business hours, repetitive questions consume valuable time, and missed inquiries often result in lost sales.</p>
<p class="wp-block-paragraph">This is exactly why AI chatbots have become one of the fastest-growing technologies for modern businesses.</p>
<p class="wp-block-paragraph">Unlike old rule-based chatbots that only respond to predefined commands, AI chatbots understand natural language, learn from your business content, and provide intelligent responses that feel natural and conversational.</p>
<p class="wp-block-paragraph">With <strong>Nivi Chat</strong>, creating an AI chatbot is easier than ever. You don't need coding skills or technical expertise. Simply upload your business knowledge, and your AI assistant is ready to answer customer questions 24/7.</p>

<h2 class="wp-block-heading">What is Nivi Chat?</h2>
<p class="wp-block-paragraph">Nivi Chat is an AI-powered chatbot platform designed to help businesses automate customer support, improve customer engagement, capture leads, and increase conversions.</p>
<p class="wp-block-paragraph">Instead of building complicated chatbot flows, Nivi Chat allows you to train your AI using your own business data. Your chatbot learns directly from your website, documents, PDFs, YouTube videos, FAQs, and custom knowledge, allowing it to answer customer questions with confidence and accuracy.</p>
<p class="wp-block-paragraph">Whether you're a startup, eCommerce store, SaaS company, educational institute, healthcare provider, or enterprise, Nivi Chat adapts to your business needs.</p>

<h2 class="wp-block-heading">Why Every Business Needs an AI Chatbot</h2>
<p class="wp-block-paragraph">Businesses receive hundreds of customer inquiries every week. Most of these questions are repetitive:</p>
<ul class="wp-block-list">
<li>What are your pricing plans?</li>
<li>How can I contact support?</li>
<li>Do you offer refunds?</li>
<li>Is WhatsApp integration available?</li>
<li>How can I schedule a demo?</li>
<li>Which plan is best for me?</li>
</ul>
<p class="wp-block-paragraph">Answering the same questions repeatedly wastes valuable time and resources.</p>
<p class="wp-block-paragraph">An AI chatbot solves this by providing instant, accurate responses 24 hours a day, 7 days a week.</p>
<p class="wp-block-paragraph">Some of the biggest benefits include:</p>
<ul class="wp-block-list">
<li>24/7 customer support</li>
<li>Faster response times</li>
<li>Increased customer satisfaction</li>
<li>Lower operational costs</li>
<li>Higher conversion rates</li>
<li>Better lead generation</li>
<li>Improved customer experience</li>
</ul>

<h2 class="wp-block-heading">Train Your AI Chatbot Using Your Own Business Data</h2>
<p class="wp-block-paragraph">The biggest advantage of Nivi Chat is its flexible AI training system. Instead of writing hundreds of chatbot responses manually, you simply provide your business knowledge, and the AI learns automatically.</p>

<h3 class="wp-block-heading">Train Using Your Website</h3>
<p class="wp-block-paragraph">Your website already contains valuable information about your business. Nivi Chat can automatically learn from your website pages, including:</p>
<ul class="wp-block-list">
<li>Home Page</li>
<li>Services</li>
<li>Product Pages</li>
<li>Pricing</li>
<li>FAQs</li>
<li>Blog Posts</li>
<li>Knowledge Base</li>
<li>Documentation</li>
</ul>
<p class="wp-block-paragraph">Once your website is scanned, your AI chatbot uses this information to answer customer questions accurately.</p>
<p class="wp-block-paragraph">For example:<br>
<strong>Customer:</strong> Do you offer WhatsApp integration?<br>
<strong>AI:</strong> Yes, Nivi Chat supports WhatsApp Business integration on eligible plans.</p>
<p class="wp-block-paragraph">Training from your website ensures that your chatbot always responds using your latest business information.</p>

<h3 class="wp-block-heading">Upload PDFs and Documents</h3>
<p class="wp-block-paragraph">Most businesses already have documents containing valuable information. Instead of rewriting everything manually, simply upload your files.</p>
<p class="wp-block-paragraph">Supported training materials include:</p>
<ul class="wp-block-list">
<li>Product Catalogs</li>
<li>Company Brochures</li>
<li>User Manuals</li>
<li>Technical Documentation</li>
<li>Training Guides</li>
<li>Policy Documents</li>
<li>Price Lists</li>
<li>PDF Files</li>
<li>DOCX Documents</li>
<li>TXT Files</li>
</ul>
<p class="wp-block-paragraph">The AI reads these documents and understands their content. This means your chatbot can instantly answer questions based on information stored inside your files.</p>

<h3 class="wp-block-heading">Train Using YouTube Videos</h3>
<p class="wp-block-paragraph">One of the most powerful features inside Nivi Chat is YouTube training. Many businesses already have tutorial videos, product demonstrations, webinars, and educational content published on YouTube.</p>
<p class="wp-block-paragraph">Instead of creating separate documentation, simply paste the YouTube video URL. Nivi Chat processes the video content and learns from it.</p>
<p class="wp-block-paragraph">This allows visitors to ask questions related to your videos. Perfect for:</p>
<ul class="wp-block-list">
<li>Product Tutorials</li>
<li>Software Demonstrations</li>
<li>Online Courses</li>
<li>Educational Videos</li>
<li>Webinars</li>
<li>Customer Training</li>
<li>Product Walkthroughs</li>
</ul>

<h3 class="wp-block-heading">Add Frequently Asked Questions (FAQs)</h3>
<p class="wp-block-paragraph">Every business answers the same questions repeatedly. Instead of answering them manually every day, create a FAQ knowledge base inside Nivi Chat.</p>

<h3 class="wp-block-heading">Create Custom Questions & Answers</h3>
<p class="wp-block-paragraph">Some business information cannot be found on your website or inside documents. For these cases, Nivi Chat allows you to manually add custom Questions & Answers.</p>
<ul class="wp-block-list">
<li>Shipping policies</li>
<li>Company policies</li>
<li>Internal procedures</li>
<li>Product specifications</li>
<li>Promotional offers</li>
<li>Pricing rules</li>
<li>Return policies</li>
</ul>

<h2 class="wp-block-heading">Choose the AI Model That Fits Your Business</h2>
<p class="wp-block-paragraph">Different businesses have different AI requirements. Nivi Chat supports multiple advanced AI models, allowing you to choose the one that best fits your budget and performance needs. Available models include:</p>
<ul class="wp-block-list">
<li>GPT-4o</li>
<li>GPT-4o Mini</li>
<li>GPT-4 Turbo</li>
<li>GPT-3.5 Turbo</li>
<li>Claude Models</li>
<li>Gemini Models</li>
<li>DeepSeek Models</li>
<li>Custom AI Models</li>
</ul>

<h2 class="wp-block-heading">Customize Your Chatbot</h2>
<p class="wp-block-paragraph">Every business has a unique identity. Nivi Chat lets you fully customize your chatbot so it matches your brand. You can personalize: Chatbot Name, Brand Colors, Welcome Message, Chat Widget Theme, Avatar, Chat Position, Appearance.</p>

<h2 class="wp-block-heading">Deploy Your Chatbot in Minutes</h2>
<p class="wp-block-paragraph">Deploying your AI chatbot is incredibly simple. Once your chatbot has been trained, Nivi Chat generates a small embed code. Simply copy the code and paste it into your website. That's it.</p>

<h2 class="wp-block-heading">WhatsApp Business Integration</h2>
<p class="wp-block-paragraph">Today, billions of people use WhatsApp every day. Instead of limiting customer support to your website, Nivi Chat allows businesses to extend AI conversations directly to WhatsApp Business.</p>

<h2 class="wp-block-heading">Manage Your Entire Support Team</h2>
<p class="wp-block-paragraph">Customer support is often handled by multiple employees. Nivi Chat includes powerful team management features that allow businesses to collaborate efficiently.</p>

<h2 class="wp-block-heading">Capture More Leads Automatically</h2>
<p class="wp-block-paragraph">Every website visitor represents a potential customer. Instead of allowing visitors to leave anonymously, Nivi Chat automatically captures valuable lead information during conversations.</p>

<h2 class="wp-block-heading">Book Appointments Automatically</h2>
<p class="wp-block-paragraph">Scheduling meetings through emails can be slow and frustrating. Nivi Chat simplifies the process by allowing customers to book appointments directly through the chatbot.</p>

<h2 class="wp-block-heading">Powerful Dashboard & Analytics</h2>
<p class="wp-block-paragraph">Understanding customer behavior is essential for business growth. Nivi Chat provides detailed analytics that help you monitor chatbot performance.</p>

<h2 class="wp-block-heading">Industries That Can Benefit from Nivi Chat</h2>
<p class="wp-block-paragraph">Nivi Chat is designed for businesses across every industry including: E-commerce, SaaS, Healthcare, Education, Real Estate, Agencies, Financial Services.</p>

<h2 class="wp-block-heading">Why Businesses Choose Nivi Chat</h2>
<p class="wp-block-paragraph">Thousands of businesses are adopting AI because it delivers measurable results. Everything you need to build a powerful AI assistant is available in one platform.</p>

<h2 class="wp-block-heading">Final Thoughts</h2>
<p class="wp-block-paragraph">Artificial Intelligence is no longer the future—it is the present. Businesses that respond quickly, provide accurate information, and remain available around the clock are the ones that earn customer trust and drive long-term growth.</p>
<p class="wp-block-paragraph"><strong>Ready to Build Your AI Chatbot?</strong> Empower your business with smarter conversations, faster support, and AI-driven customer engagement. Start using Nivi Chat today and transform the way you connect with your customers.</p>
`;

const newPost = {
    id: newId,
    title: "The Complete Guide to AI Chatbots: Train Your AI with Your Own Data Using Nivi Chat",
    slug: "complete-guide-to-ai-chatbots-nivi-chat",
    excerpt: "Discover how to build an AI chatbot trained on your website, PDFs, YouTube videos, FAQs, and custom data using Nivi Chat. Automate customer support, generate more leads, and grow your business with AI.",
    content: content,
    category: "AI Chatbots",
    date: "Jul 1, 2026",
    imageUrl: "/images/blog/nivi-chat-guide-2.jpg",
    featured: true
};

posts.unshift(newPost);

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('PDF Post added successfully!');
