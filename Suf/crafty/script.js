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
  const container = document.getElementById("slider");
  const track = document.getElementById("track");

  if (container && track) {
    // Clone children for seamless infinite scroll marquee
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    let isScrolling = true;
    let scrollSpeed = 1; // Adjust speed if needed

    const autoScroll = () => {
      if (isScrolling) {
        container.scrollLeft += scrollSpeed;
        
        // If we have scrolled past the original set of items, reset to 0 seamlessly
        if (container.scrollLeft >= track.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      requestAnimationFrame(autoScroll);
    };

    // Start auto scroll
    requestAnimationFrame(autoScroll);

    // Pause on hover or manual interaction
    container.addEventListener('mouseenter', () => isScrolling = false);
    container.addEventListener('mouseleave', () => isScrolling = true);
    
    // For touch devices
    container.addEventListener('touchstart', () => isScrolling = false);
    container.addEventListener('touchend', () => isScrolling = true);
  }
});



// =========================
// MOBILE MENU TOGGLE
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});