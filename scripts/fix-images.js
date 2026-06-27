const fs = require('fs');
const file = 'src/data/posts.json';
let data = fs.readFileSync(file, 'utf8');
const placeholder = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnf6Q1YEzl8tHczfiuVUXM-XuAEWe_D-gHq3MuT3lgovpv2858cZfN8fhVdJZnTpSv1salDxWnrpTucVnPLy0AkLO4ZqREs3Kaeo0FW25tQvPzMinsVROZNAyHYFCD_EneXCIf8ax51Kk2hcfmBMXunHyDo8IjWVGAIhmxXOQfCBP-tfZD5wKekrOWV-mOILd2vvU1DPftf-RP_b15kmieQqcN3Qno9xCC4JO87h0STmcsKQYvoac9mrOVGNjLfOqK9xeW2wORXXO2';
data = data.replace(/https:\/\/blog\.genxwhosting\.com\/wp-content\/uploads\/[^"'\s<]+/g, placeholder);
fs.writeFileSync(file, data);
console.log('Replaced all broken image URLs with placeholders.');
