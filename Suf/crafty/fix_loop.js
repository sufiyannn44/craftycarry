const fs = require('fs');
const file = 'c:\\Users\\Sufiyan\\craftycarry\\Suf\\crafty\\pages\\allproducts.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "for(let i=0; i<20; i++){\n  const product = products[i % products.length];",
  "for(let i=0; i<products.length; i++){\n  const product = products[i];"
);
// fallback if CRLF:
content = content.replace(
  "for(let i=0; i<20; i++){\r\n  const product = products[i % products.length];",
  "for(let i=0; i<products.length; i++){\r\n  const product = products[i];"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed loop.');
