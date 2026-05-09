const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexFile, 'utf8');

const replacementCards = `    <div class="card" onclick="openProduct('Classic Jute Tote', 'images/1.jpg', '600')">
      <div class="card-badge">Bestseller</div>
      <div class="img-wrapper">
        <img src="images/1.jpg" alt="Classic Jute Tote" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Classic Jute Tote</h3>
        <p class="price">₹600 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Premium Jute Tote', 'images/2.jpg', '700')">
      <div class="img-wrapper">
        <img src="images/2.jpg" alt="Premium Jute Tote" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Premium Jute Tote</h3>
        <p class="price">₹700 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Designer Jute Tote', 'images/3.jpg', '900')">
      <div class="card-badge">New</div>
      <div class="img-wrapper">
        <img src="images/3.jpg" alt="Designer Jute Tote" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Designer Jute Tote</h3>
        <p class="price">₹900 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
`;

const sectionStart = indexHtml.indexOf('<section id="jute-tote"');
const productsDivStart = indexHtml.indexOf('<div class="products">', sectionStart);
const productsDivEnd = indexHtml.indexOf('</div>\n  <div class="view-all">', productsDivStart);

if (sectionStart !== -1 && productsDivStart !== -1 && productsDivEnd !== -1) {
  const replacement = `<div class="products">\n${replacementCards}`;
  indexHtml = indexHtml.substring(0, productsDivStart) + replacement + indexHtml.substring(productsDivEnd);
  fs.writeFileSync(indexFile, indexHtml, 'utf8');
  console.log("Restored index.html successfully.");
} else {
  console.log("Failed to find boundaries.");
}
