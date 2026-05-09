const fs = require('fs');
const file = 'c:\\Users\\Sufiyan\\craftycarry\\Suf\\crafty\\pages\\allproducts.html';
let content = fs.readFileSync(file, 'utf8');

// Replace all instances of image:"../jute bags/ with image:"jute bags/
content = content.replace(/image:"\.\.\/jute bags\//g, 'image:"jute bags/');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed paths.');
