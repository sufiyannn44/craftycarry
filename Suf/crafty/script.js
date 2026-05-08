// =========================
// OPEN SINGLE PRODUCT PAGE
// =========================

function openProduct(name, image, price){
  // Encode URI to avoid spaces/newlines breaking the URL
  const query = `name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}`;
  const isPagesDir = window.location.pathname.includes('/pages/');
  const path = isPagesDir ? `product.html` : `pages/product.html`;
  window.location.href = `${path}?${query}`;
}

// =========================
// VIEW ALL PRODUCTS PAGE
// =========================

function viewAll(category){
  // SAVE CATEGORY (try-catch for file:// protocol restrictions)
  try {
    localStorage.setItem("selectedCategory", category);
  } catch (e) {
    console.warn("localStorage not available");
  }

  // OPEN ALL PRODUCTS PAGE WITH QUERY PARAMS
  const isPagesDir = window.location.pathname.includes('/pages/');
  const path = isPagesDir ? `allproducts.html` : `pages/allproducts.html`;
  window.location.href = path + "?category=" + encodeURIComponent(category);
}

// =========================
// SLIDER ANIMATION
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("track");

  if (track) {
    // Clone children for seamless infinite scroll marquee
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }
});