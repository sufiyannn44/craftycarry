const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const allProductsHtmlPath = path.join(__dirname, 'pages', 'allproducts.html');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Update Navigation
indexHtml = indexHtml.replace(
  /<nav id="nav-menu">[\s\S]*?<\/nav>/,
  `<nav id="nav-menu">
    <a href="#jute-tote">Jute Tote bag</a>
    <a href="#cotton-tote">Cotton Tote bag</a>
    <a href="#window-hamper">Window hamper bag</a>
    <a href="#bottle-bag">Bottle Jute & Cotton bag</a>
    <a href="#wedding-bag">wedding jute&cotton bags</a>
    <a href="#kids-bag">Kids jute&cotton bags</a>
    <a href="#plain-bag">Plain jute& cotton bags</a>
  </nav>`
);

// 2. Update Hero Link
indexHtml = indexHtml.replace(
  /<a href="#tote" class="btn-shop">Explore Collection<\/a>/,
  `<a href="#jute-tote" class="btn-shop">Explore Collection</a>`
);

// 3. Update Slider
const newSlider = `    <div class="slide-track" id="track">
      <a href="#jute-tote" class="item-link">
        <div class="item">
          <div class="item-img-wrapper">
            <img src="images/1.jpg" alt="Jute Tote bag" onerror="this.src='images/1.jpg'">
          </div>
          <p>Jute Tote bag</p>
        </div>
      </a>
      
      <a href="#cotton-tote" class="item-link">
        <div class="item">
          <div class="item-img-wrapper">
            <img src="images/2.jpg" alt="Cotton Tote bag" onerror="this.src='images/1.jpg'">
          </div>
          <p>Cotton Tote bag</p>
        </div>
      </a>

      <a href="#window-hamper" class="item-link">
        <div class="item">
          <div class="item-img-wrapper">
            <img src="images/3.jpg" alt="Window hamper bag" onerror="this.src='images/1.jpg'">
          </div>
          <p>Window hamper bag</p>
        </div>
      </a>

      <a href="#bottle-bag" class="item-link">
        <div class="item">
          <div class="item-img-wrapper">
            <img src="images/4.jpg" alt="Bottle Jute & Cotton bag" onerror="this.src='images/1.jpg'">
          </div>
          <p>Bottle Jute & Cotton</p>
        </div>
      </a>

      <a href="#wedding-bag" class="item-link">
        <div class="item">
          <div class="item-img-wrapper">
            <img src="images/5.jpg" alt="wedding jute&cotton bags" onerror="this.src='images/1.jpg'">
          </div>
          <p>Wedding Bags</p>
        </div>
      </a>

      <a href="#kids-bag" class="item-link">
        <div class="item">
          <div class="item-img-wrapper">
            <img src="images/6.jpg" alt="Kids jute&cotton bags" onerror="this.src='images/1.jpg'">
          </div>
          <p>Kids Bags</p>
        </div>
      </a>

      <a href="#plain-bag" class="item-link">
        <div class="item">
          <div class="item-img-wrapper">
            <img src="images/1.jpg" alt="Plain jute& cotton bags" onerror="this.src='images/1.jpg'">
          </div>
          <p>Plain Bags</p>
        </div>
      </a>
    </div>`;
indexHtml = indexHtml.replace(/<div class="slide-track" id="track">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, newSlider + '\n  </div>\n</section>');

// 4. Update Sections
const sectionsRegex = /<!-- TOTE -->[\s\S]*?<!-- FOOTER -->/;
const newSections = `<!-- JUTE TOTE -->
<section id="jute-tote" class="category">
  <h2>Jute Tote Bags</h2>
  <div class="products">
    <div class="card" onclick="openProduct('Classic Jute Tote', 'images/1.jpg', '600')">
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
  </div>
  <div class="view-all">
    <button onclick="viewAll('juteTote')">VIEW ALL JUTE TOTE BAGS</button>
  </div>
</section>

<!-- COTTON TOTE -->
<section id="cotton-tote" class="category">
  <h2>Cotton Tote Bags</h2>
  <div class="products">
    <div class="card" onclick="openProduct('Classic Cotton Tote', 'images/4.jpg', '650')">
      <div class="img-wrapper">
        <img src="images/4.jpg" alt="Classic Cotton Tote" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Classic Cotton Tote</h3>
        <p class="price">₹650 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Printed Cotton Tote', 'images/5.jpg', '750')">
      <div class="img-wrapper">
        <img src="images/5.jpg" alt="Printed Cotton Tote" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Printed Cotton Tote</h3>
        <p class="price">₹750 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Premium Cotton Tote', 'images/6.jpg', '900')">
      <div class="card-badge">Premium</div>
      <div class="img-wrapper">
        <img src="images/6.jpg" alt="Premium Cotton Tote" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Premium Cotton Tote</h3>
        <p class="price">₹900 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
  </div>
  <div class="view-all">
    <button onclick="viewAll('cottonTote')">VIEW ALL COTTON TOTE BAGS</button>
  </div>
</section>

<!-- WINDOW HAMPER -->
<section id="window-hamper" class="category">
  <h2>Window Hamper Bags</h2>
  <div class="products">
    <div class="card" onclick="openProduct('Classic Window Hamper', 'images/1.jpg', '400')">
      <div class="img-wrapper">
        <img src="images/1.jpg" alt="Classic Window Hamper" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Classic Window Hamper</h3>
        <p class="price">₹400 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Gift Window Hamper', 'images/2.jpg', '550')">
      <div class="img-wrapper">
        <img src="images/2.jpg" alt="Gift Window Hamper" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Gift Window Hamper</h3>
        <p class="price">₹550 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Premium Window Hamper', 'images/3.jpg', '700')">
      <div class="img-wrapper">
        <img src="images/3.jpg" alt="Premium Window Hamper" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Premium Window Hamper</h3>
        <p class="price">₹700 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
  </div>
  <div class="view-all">
    <button onclick="viewAll('windowHamper')">VIEW ALL WINDOW HAMPER BAGS</button>
  </div>
</section>

<!-- BOTTLE BAGS -->
<section id="bottle-bag" class="category">
  <h2>Bottle Jute & Cotton Bags</h2>
  <div class="products">
    <div class="card" onclick="openProduct('Jute Bottle Bag', 'images/4.jpg', '800')">
      <div class="img-wrapper">
        <img src="images/4.jpg" alt="Jute Bottle Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Jute Bottle Bag</h3>
        <p class="price">₹800 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Cotton Bottle Bag', 'images/5.jpg', '900')">
      <div class="card-badge">Custom Logo</div>
      <div class="img-wrapper">
        <img src="images/5.jpg" alt="Cotton Bottle Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Cotton Bottle Bag</h3>
        <p class="price">₹900 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Premium Bottle Bag', 'images/6.jpg', '1200')">
      <div class="img-wrapper">
        <img src="images/6.jpg" alt="Premium Bottle Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Premium Bottle Bag</h3>
        <p class="price">₹1200 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
  </div>
  <div class="view-all">
    <button onclick="viewAll('bottleBag')">VIEW ALL BOTTLE BAGS</button>
  </div>
</section>

<!-- WEDDING BAGS -->
<section id="wedding-bag" class="category">
  <h2>Wedding Jute & Cotton Bags</h2>
  <div class="products">
    <div class="card" onclick="openProduct('Traditional Wedding Bag', 'images/1.jpg', '500')">
      <div class="img-wrapper">
        <img src="images/1.jpg" alt="Traditional Wedding Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Traditional Wedding Bag</h3>
        <p class="price">₹500 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Designer Wedding Bag', 'images/2.jpg', '700')">
      <div class="card-badge">Wedding</div>
      <div class="img-wrapper">
        <img src="images/2.jpg" alt="Designer Wedding Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Designer Wedding Bag</h3>
        <p class="price">₹700 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Premium Wedding Bag', 'images/3.jpg', '950')">
      <div class="img-wrapper">
        <img src="images/3.jpg" alt="Premium Wedding Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Premium Wedding Bag</h3>
        <p class="price">₹950 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
  </div>
  <div class="view-all">
    <button onclick="viewAll('weddingBag')">VIEW ALL WEDDING BAGS</button>
  </div>
</section>

<!-- KIDS BAGS -->
<section id="kids-bag" class="category">
  <h2>Kids Jute & Cotton Bags</h2>
  <div class="products">
    <div class="card" onclick="openProduct('Cartoon Kids Bag', 'images/4.jpg', '400')">
      <div class="img-wrapper">
        <img src="images/4.jpg" alt="Cartoon Kids Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Cartoon Kids Bag</h3>
        <p class="price">₹400 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('School Kids Bag', 'images/5.jpg', '600')">
      <div class="img-wrapper">
        <img src="images/5.jpg" alt="School Kids Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>School Kids Bag</h3>
        <p class="price">₹600 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Premium Kids Bag', 'images/6.jpg', '800')">
      <div class="img-wrapper">
        <img src="images/6.jpg" alt="Premium Kids Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Premium Kids Bag</h3>
        <p class="price">₹800 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
  </div>
  <div class="view-all">
    <button onclick="viewAll('kidsBag')">VIEW ALL KIDS BAGS</button>
  </div>
</section>

<!-- PLAIN BAGS -->
<section id="plain-bag" class="category">
  <h2>Plain Jute & Cotton Bags</h2>
  <div class="products">
    <div class="card" onclick="openProduct('Basic Plain Bag', 'images/1.jpg', '300')">
      <div class="img-wrapper">
        <img src="images/1.jpg" alt="Basic Plain Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Basic Plain Bag</h3>
        <p class="price">₹300 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Standard Plain Bag', 'images/2.jpg', '450')">
      <div class="img-wrapper">
        <img src="images/2.jpg" alt="Standard Plain Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Standard Plain Bag</h3>
        <p class="price">₹450 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
    <div class="card" onclick="openProduct('Premium Plain Bag', 'images/3.jpg', '600')">
      <div class="img-wrapper">
        <img src="images/3.jpg" alt="Premium Plain Bag" onerror="this.src='images/1.jpg'">
      </div>
      <div class="card-content">
        <h3>Premium Plain Bag</h3>
        <p class="price">₹600 <span>/ piece</span></p>
        <button>View Details</button>
      </div>
    </div>
  </div>
  <div class="view-all">
    <button onclick="viewAll('plainBag')">VIEW ALL PLAIN BAGS</button>
  </div>
</section>

<!-- FOOTER -->`;
indexHtml = indexHtml.replace(sectionsRegex, newSections);

// 5. Update Footer Quick Links
indexHtml = indexHtml.replace(
  /<h4>Quick Links<\/h4>[\s\S]*?<\/div>/,
  `<h4>Quick Links</h4>
      <p><a href="#jute-tote">Jute Tote bag</a></p>
      <p><a href="#cotton-tote">Cotton Tote bag</a></p>
      <p><a href="#window-hamper">Window hamper bag</a></p>
      <p><a href="#bottle-bag">Bottle Jute & Cotton bag</a></p>
      <p><a href="#wedding-bag">wedding jute&cotton bags</a></p>
      <p><a href="#kids-bag">Kids jute&cotton bags</a></p>
      <p><a href="#plain-bag">Plain jute& cotton bags</a></p>
    </div>`
);

fs.writeFileSync(indexHtmlPath, indexHtml);

// --- UPDATE ALL PRODUCTS PAGE ---

let allProductsHtml = fs.readFileSync(allProductsHtmlPath, 'utf8');

const newAllProductsJS = `// PRODUCTS
const allProducts = {
  juteTote:[
    {name:"Classic Jute Tote", image:"images/1.jpg", price:"600"},
    {name:"Premium Jute Tote", image:"images/2.jpg", price:"700"},
    {name:"Designer Jute Tote", image:"images/3.jpg", price:"900"}
  ],
  cottonTote:[
    {name:"Classic Cotton Tote", image:"images/4.jpg", price:"650"},
    {name:"Printed Cotton Tote", image:"images/5.jpg", price:"750"},
    {name:"Premium Cotton Tote", image:"images/6.jpg", price:"900"}
  ],
  windowHamper:[
    {name:"Classic Window Hamper", image:"images/1.jpg", price:"400"},
    {name:"Gift Window Hamper", image:"images/2.jpg", price:"550"},
    {name:"Premium Window Hamper", image:"images/3.jpg", price:"700"}
  ],
  bottleBag:[
    {name:"Jute Bottle Bag", image:"images/4.jpg", price:"800"},
    {name:"Cotton Bottle Bag", image:"images/5.jpg", price:"900"},
    {name:"Premium Bottle Bag", image:"images/6.jpg", price:"1200"}
  ],
  weddingBag:[
    {name:"Traditional Wedding Bag", image:"images/1.jpg", price:"500"},
    {name:"Designer Wedding Bag", image:"images/2.jpg", price:"700"},
    {name:"Premium Wedding Bag", image:"images/3.jpg", price:"950"}
  ],
  kidsBag:[
    {name:"Cartoon Kids Bag", image:"images/4.jpg", price:"400"},
    {name:"School Kids Bag", image:"images/5.jpg", price:"600"},
    {name:"Premium Kids Bag", image:"images/6.jpg", price:"800"}
  ],
  plainBag:[
    {name:"Basic Plain Bag", image:"images/1.jpg", price:"300"},
    {name:"Standard Plain Bag", image:"images/2.jpg", price:"450"},
    {name:"Premium Plain Bag", image:"images/3.jpg", price:"600"}
  ]
};

// CONTAINER
const container = document.getElementById("products");

// GET CURRENT CATEGORY PRODUCTS
const products = allProducts[category] || allProducts['juteTote']; // fallback to juteTote`;

allProductsHtml = allProductsHtml.replace(/\/\/ PRODUCTS[\s\S]*?\/\/ fallback to tote/, newAllProductsJS);

// Also fix the page title formatter to handle camelCase -> Normal Words if needed
const newTitleLogic = `if(category) {
  // Format title: add space before capital letters and uppercase first letter
  const formattedCategory = category.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  document.getElementById("page-title").innerText = formattedCategory + " Bags";
}`;

allProductsHtml = allProductsHtml.replace(/if\(category\) {[\s\S]*?}/, newTitleLogic);

fs.writeFileSync(allProductsHtmlPath, allProductsHtml);

console.log('Successfully updated categories!');
