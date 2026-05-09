const fs = require('fs');
const path = require('path');

const juteDir = path.join(__dirname, 'jute bags');
const indexFile = path.join(__dirname, 'index.html');
const allProductsFile = path.join(__dirname, 'pages', 'allproducts.html');

let files = [];
try {
  files = fs.readdirSync(juteDir);
} catch (err) {
  console.error("Error reading directory", err);
  process.exit(1);
}

// filter for images
const images = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

// Sort images numerically if possible
images.sort((a, b) => {
  const numA = parseInt(a.replace(/\D/g, '')) || 0;
  const numB = parseInt(b.replace(/\D/g, '')) || 0;
  return numA - numB;
});

// Generate product list
const products = images.map(img => {
  const num = img.replace(/\.[^/.]+$/, "");
  return {
    name: `Jute Bag ${num}`,
    image: `jute bags/${img}`,
    price: "600"
  };
});

// --- Update allproducts.html ---
let allProdHtml = fs.readFileSync(allProductsFile, 'utf8');

// The array inside allProducts = { juteTote: [...]
const juteToteRegex = /(juteTote:\s*\[)[\s\S]*?(\],)/;

const newJuteArrayStr = "juteTote: [\n" + products.map(p => `    {name:"${p.name}", image:"../${p.image}", price:"${p.price}"}`).join(",\n") + "\n  ],";

if (juteToteRegex.test(allProdHtml)) {
  allProdHtml = allProdHtml.replace(juteToteRegex, newJuteArrayStr);
  fs.writeFileSync(allProductsFile, allProdHtml, 'utf8');
  console.log("Updated allproducts.html");
} else {
  console.log("Could not find juteTote array in allproducts.html");
}

// --- Update index.html ---
let indexHtml = fs.readFileSync(indexFile, 'utf8');

// Find the section id="jute-tote"
// We want to replace the contents inside <div class="products"> ... </div> for this section.
const sectionStart = indexHtml.indexOf('<section id="jute-tote"');
if (sectionStart !== -1) {
  const productsDivStart = indexHtml.indexOf('<div class="products">', sectionStart);
  if (productsDivStart !== -1) {
    const productsDivEnd = indexHtml.indexOf('</div>\n  <div class="view-all">', productsDivStart);
    
    if (productsDivEnd !== -1) {
      let cardsHtml = "";
      products.forEach(p => {
        cardsHtml += `    <div class="card" onclick="openProduct('${p.name}', '${p.image}', '${p.price}')">\n`;
        cardsHtml += `      <div class="img-wrapper">\n`;
        cardsHtml += `        <img src="${p.image}" alt="${p.name}" onerror="this.src='images/1.jpg'">\n`;
        cardsHtml += `      </div>\n`;
        cardsHtml += `      <div class="card-content">\n`;
        cardsHtml += `        <h3>${p.name}</h3>\n`;
        cardsHtml += `        <p class="price">₹${p.price} <span>/ piece</span></p>\n`;
        cardsHtml += `        <button>View Details</button>\n`;
        cardsHtml += `      </div>\n`;
        cardsHtml += `    </div>\n`;
      });
      
      const replacement = `<div class="products">\n${cardsHtml}  `;
      indexHtml = indexHtml.substring(0, productsDivStart) + replacement + indexHtml.substring(productsDivEnd);
      
      fs.writeFileSync(indexFile, indexHtml, 'utf8');
      console.log("Updated index.html");
    } else {
      console.log("Could not find end of products div in index.html");
    }
  } else {
    console.log("Could not find products div in index.html");
  }
} else {
  console.log("Could not find jute-tote section in index.html");
}
