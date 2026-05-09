// =========================
// WISHLIST LOGIC
// =========================

let wishlist = JSON.parse(localStorage.getItem('craftyWishlist')) || [];

// Calculate path prefix depending on if we're in /pages/ or root
const isPages = window.location.pathname.includes('/pages/');
const pathPrefix = isPages ? '../' : '';

function initWishlist() {
  updateWishlistBadge();
  renderWishlistDrawer();
  updateAllHeartIcons();
}

// Toggle a product in the wishlist
function toggleWishlist(event, name, image, price) {
  event.stopPropagation(); // Prevent opening product detail page
  
  const index = wishlist.findIndex(item => item.name === name);
  
  if (index > -1) {
    // Remove if exists
    wishlist.splice(index, 1);
  } else {
    // Add if not exists
    wishlist.push({ name, image, price });
  }
  
  localStorage.setItem('craftyWishlist', JSON.stringify(wishlist));
  
  // Animate the heart icon
  const icon = event.currentTarget.querySelector('i');
  if (icon) {
    icon.style.transform = 'scale(1.3)';
    setTimeout(() => { icon.style.transform = 'scale(1)'; }, 200);
  }
  
  updateWishlistBadge();
  renderWishlistDrawer();
  updateAllHeartIcons();
}

// Update the badge count in the header
function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    badge.innerText = wishlist.length;
    if (wishlist.length > 0) {
      badge.style.display = 'flex';
      badge.classList.add('pop-animation');
      setTimeout(() => badge.classList.remove('pop-animation'), 300);
    } else {
      badge.style.display = 'none';
    }
  }
}

// Update heart icons on the current page
function updateAllHeartIcons() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    // Extract info from onclick attribute
    const onclickStr = card.getAttribute('onclick');
    if (!onclickStr) return;
    
    // e.g. openProduct('Basic Potli', 'images/1.jpg', '200')
    const match = onclickStr.match(/openProduct\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/);
    if (!match) return;
    
    const name = match[1];
    const image = match[2];
    const price = match[3];
    
    const imgWrapper = card.querySelector('.img-wrapper');
    if (!imgWrapper) return;
    
    // Inject if not exists
    let btn = imgWrapper.querySelector('.like-btn');
    if (!btn) {
      btn = document.createElement('div');
      btn.className = 'like-btn';
      btn.setAttribute('data-name', name);
      btn.onclick = (e) => toggleWishlist(e, name, image, price);
      btn.innerHTML = '<i class="far fa-heart"></i>';
      imgWrapper.appendChild(btn);
    }
  });

  // Now update ALL .like-btn on the page (including the ones injected inline on product.html)
  const allHeartBtns = document.querySelectorAll('.like-btn');
  allHeartBtns.forEach(btn => {
    const name = btn.getAttribute('data-name');
    const icon = btn.querySelector('i');
    if (wishlist.some(item => item.name === name)) {
      btn.classList.add('active');
      if(icon) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      }
    } else {
      btn.classList.remove('active');
      if(icon) {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    }
  });
}

// Open / Close Drawer
function toggleWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-overlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

function removeWishlistItem(name) {
  wishlist = wishlist.filter(item => item.name !== name);
  localStorage.setItem('craftyWishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  renderWishlistDrawer();
  updateAllHeartIcons();
}

function renderWishlistDrawer() {
  const content = document.getElementById('wishlist-content');
  if (!content) return;
  
  if (wishlist.length === 0) {
    content.innerHTML = `<div class="empty-wishlist">
      <i class="far fa-heart" style="font-size: 40px; margin-bottom: 20px; color: var(--gray-light);"></i>
      <p>Your wishlist is empty.</p>
      <button onclick="toggleWishlistDrawer()" class="shop-now-btn">Continue Shopping</button>
    </div>`;
    return;
  }
  
  let html = '';
  wishlist.forEach(item => {
    // Make sure image path is correct relative to current directory
    let imgPath = item.image;
    if (isPages && !imgPath.startsWith('../')) {
      imgPath = '../' + imgPath;
    } else if (!isPages && imgPath.startsWith('../')) {
      imgPath = imgPath.replace('../', '');
    }
    
    html += `
      <div class="wishlist-item">
        <img src="${imgPath}" alt="${item.name}" onerror="this.src='${pathPrefix}images/1.jpg'" onclick="openProduct('${item.name}', '${item.image}', '${item.price}')" style="cursor: pointer;">
        <div class="wishlist-item-details">
          <h4 onclick="openProduct('${item.name}', '${item.image}', '${item.price}')" style="cursor: pointer;">${item.name}</h4>
          <p class="price">₹${item.price}</p>
          <div class="wishlist-actions">
            <button class="remove-btn" onclick="removeWishlistItem('${item.name}')"><i class="fas fa-trash"></i></button>
            <button class="inquire-btn" onclick="inquireWishlistItem('${item.name}', '${item.price}')"><i class="fab fa-whatsapp"></i></button>
          </div>
        </div>
      </div>
    `;
  });
  content.innerHTML = html;
}

function inquireWishlistItem(name, price) {
  const msg = `Hello, I want to inquire about ${name} (₹${price}) from my wishlist.`;
  window.open(`https://wa.me/919315748789?text=${encodeURIComponent(msg)}`);
}

document.addEventListener("DOMContentLoaded", initWishlist);
