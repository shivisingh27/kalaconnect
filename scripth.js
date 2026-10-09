const products = [
  {
    id: "KC-VAR-2026-001",
    name: "Banarasi Handloom Saree",
    city: "Varanasi",
    state: "Uttar Pradesh",
    category: "Handloom",
    price: 8500,
    icon: "👗",
    colorClass: "color-saree",
    seller: "Shanti Devi Handloom Collective",
    story:
      "Handwoven in Varanasi by artisan families preserving traditional Banarasi weaving techniques. Every saree carries the detailed work, patience, and heritage of generations of weavers."
  },
  {
    id: "KC-MEE-2026-002",
    name: "Willow Cricket Bat",
    city: "Meerut",
    state: "Uttar Pradesh",
    category: "Sports Craft",
    price: 2400,
    icon: "🏏",
    colorClass: "color-bat",
    seller: "Meerut Sports Crafts",
    story:
      "Crafted in Meerut, a city known for sports goods manufacturing. This willow cricket bat is shaped, pressed, and finished by skilled local makers."
  },
  {
    id: "KC-JAI-2026-003",
    name: "Blue Pottery Vase",
    city: "Jaipur",
    state: "Rajasthan",
    category: "Pottery",
    price: 1200,
    icon: "🏺",
    colorClass: "color-pottery",
    seller: "Jaipur Blue Pottery Studio",
    story:
      "Inspired by Jaipur's famous blue pottery tradition, this decorative vase is carefully shaped and painted by local pottery artisans."
  },
  {
    id: "KC-MAD-2026-004",
    name: "Madhubani Painting",
    city: "Madhubani",
    state: "Bihar",
    category: "Painting",
    price: 3200,
    icon: "🎨",
    colorClass: "color-painting",
    seller: "Mithila Kala Collective",
    story:
      "A handmade Madhubani painting from Bihar, using a folk-art style that tells stories through detailed line work, bright natural motifs, and cultural symbolism."
  },
  {
    id: "KC-KON-2026-005",
    name: "Brass Dhokra Elephant",
    city: "Kondagaon",
    state: "Chhattisgarh",
    category: "Metal Craft",
    price: 2800,
    icon: "🐘",
    colorClass: "color-dhokra",
    seller: "Bastar Dhokra Artisans",
    story:
      "Made using the ancient lost-wax casting method, this Dhokra elephant represents the rich metal-craft heritage of Bastar artisans."
  },
  {
    id: "KC-KOL-2026-006",
    name: "Kolhapuri Chappals",
    city: "Kolhapur",
    state: "Maharashtra",
    category: "Footwear",
    price: 1800,
    icon: "👞",
    colorClass: "color-chappal",
    seller: "Kolhapur Leather Crafts",
    story:
      "Traditional Kolhapuri chappals handcrafted by local leather artisans. Their durable construction and distinctive style are rooted in Maharashtra's craft heritage."
  }
];

let cart = JSON.parse(localStorage.getItem("kalaConnectCart")) || [];

/* Get HTML elements */

const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");

const searchInput = document.getElementById("searchInput");
const stateFilter = document.getElementById("stateFilter");
const categoryFilter = document.getElementById("categoryFilter");
const clearButton = document.getElementById("clearButton");

const productModal = document.getElementById("productModal");
const authModal = document.getElementById("authModal");
const sellerModal = document.getElementById("sellerModal");
const cartModal = document.getElementById("cartModal");

const productModalContent = document.getElementById("productModalContent");
const authModalContent = document.getElementById("authModalContent");

const sellerButton = document.getElementById("sellerButton");
const cartButton = document.getElementById("cartButton");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const closeProductModal = document.getElementById("closeProductModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const closeSellerModal = document.getElementById("closeSellerModal");
const closeCartModal = document.getElementById("closeCartModal");

const sellerForm = document.getElementById("sellerForm");
const formSuccess = document.getElementById("formSuccess");
const checkoutButton = document.getElementById("checkoutButton");

/* Utility functions */

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function saveCart() {
  localStorage.setItem("kalaConnectCart", JSON.stringify(cart));
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function openModal(modal) {
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  modal.classList.add("hidden");

  const openModalCheck = document.querySelector(".modal:not(.hidden)");

  if (!openModalCheck) {
    document.body.classList.remove("modal-open");
  }
}

/* Display product cards */

function displayProducts(productList) {
  productGrid.innerHTML = "";

  if (productList.length === 0) {
    productGrid.innerHTML = `
      <p class="empty-message">
        No products found. Try another search word, state, or category.
      </p>
    `;

    productCount.textContent = "0 products found";
    return;
  }

  productList.forEach((product) => {
    productGrid.innerHTML += `
      <article class="product-card">
        <div class="product-image ${product.colorClass}">
          ${product.icon}
        </div>

        <div class="product-content">
          <span class="verified-badge">✅ Verified origin</span>

          <h3>${product.name}</h3>

          <p class="location">📍 ${product.city}, ${product.state}</p>

          <p class="seller-text">Made by ${product.seller}</p>

          <div class="product-bottom">
            <span class="product-price">${formatPrice(product.price)}</span>

            <button
              class="view-button"
              onclick="openProductDetails('${product.id}')"
            >
              View details
            </button>
          </div>
        </div>
      </article>
    `;
  });

  productCount.textContent =
    `${productList.length} product${productList.length > 1 ? "s" : ""} found`;
}

/* Search and filters */

function filterProducts() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedState = stateFilter.value;
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter((product) => {
    const productText = `
      ${product.name}
      ${product.city}
      ${product.state}
      ${product.category}
      ${product.seller}
      ${product.story}
    `.toLowerCase();

    const matchesSearch = productText.includes(searchText);

    const matchesState =
      selectedState === "all" || product.state === selectedState;

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesState && matchesCategory;
  });

  displayProducts(filteredProducts);
}

searchInput.addEventListener("input", filterProducts);
stateFilter.addEventListener("change", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  stateFilter.value = "all";
  categoryFilter.value = "all";

  displayProducts(products);
});

/* Product Detail Modal */

function openProductDetails(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  productModalContent.innerHTML = `
    <section class="product-detail">
      <div class="detail-image-area ${product.colorClass}">
        ${product.icon}
      </div>

      <div class="detail-content">
        <span class="verified-badge">✅ Verified origin</span>

        <h2>${product.name}</h2>

        <p class="detail-price">${formatPrice(product.price)}</p>

        <p class="location">📍 ${product.city}, ${product.state}</p>

        <h3>Meet the maker</h3>

        <p>
          <strong>${product.seller}</strong><br>
          This artisan group has submitted identity, craft, and origin
          details for verification on कलाकनेक्ट.
        </p>

        <h3>Craft story</h3>

        <p>${product.story}</p>

        <div class="detail-actions">
          <button
            class="primary-button"
            onclick="addToCart('${product.id}')"
          >
            Add to Cart
          </button>

          <button
            class="secondary-button"
            onclick="openAuthenticityCard('${product.id}')"
          >
            View Authenticity Card
          </button>
        </div>
      </div>
    </section>
  `;

  openModal(productModal);
}

/* Digital Authenticity Card */

function openAuthenticityCard(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  authModalContent.innerHTML = `
    <section class="auth-card">
      <div class="auth-header">
        <p class="auth-brand">कलाकनेक्ट</p>

        <h2>Digital Authenticity Card</h2>

        <p>Craft identity · Maker story · Verified origin</p>
      </div>

      <div class="auth-product-icon ${product.colorClass}">
        ${product.icon}
      </div>

      <div class="auth-content">
        <span class="verified-badge">✅ Origin Verified</span>

        <h2>${product.name}</h2>

        <div class="auth-details">
          <div class="auth-detail">
            <span>Product ID</span>
            <strong>${product.id}</strong>
          </div>

          <div class="auth-detail">
            <span>Craft Category</span>
            <strong>${product.category}</strong>
          </div>

          <div class="auth-detail">
            <span>Made In</span>
            <strong>${product.city}, ${product.state}</strong>
          </div>

          <div class="auth-detail">
            <span>Verified Seller</span>
            <strong>${product.seller}</strong>
          </div>
        </div>

        <div class="story-box">
          <h3>The story behind this craft</h3>
          <p>${product.story}</p>
        </div>

        <div class="qr-area">
          <div class="fake-qr">
            <span>KC</span>
          </div>

          <div>
            <h3>Scan to verify</h3>

            <p>
              In the full कलाकनेक्ट platform, this QR code opens a unique,
              secure verification record for this product.
            </p>
          </div>
        </div>

        <p class="issued-text">
          Certificate issued by कलाकनेक्ट · Verified Product Passport
        </p>
      </div>
    </section>
  `;

  closeModal(productModal);
  openModal(authModal);
}

/* Cart Functions */

function addToCart(productId) {
  const alreadyInCart = cart.includes(productId);

  if (!alreadyInCart) {
    cart.push(productId);
    saveCart();
    updateCartCount();
  }

  closeModal(productModal);
  renderCart();
  openModal(cartModal);
}

function removeFromCart(productId) {
  cart = cart.filter((id) => id !== productId);

  saveCart();
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartProducts = products.filter((product) => cart.includes(product.id));

  if (cartProducts.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty. Explore authentic crafts to add a product.
      </p>
    `;

    cartTotal.textContent = "Total: ₹0";
    checkoutButton.style.display = "none";
    return;
  }

  checkoutButton.style.display = "inline-block";

  cartItems.innerHTML = "";

  let total = 0;

  cartProducts.forEach((product) => {
    total += product.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-icon ${product.colorClass}">
          ${product.icon}
        </div>

        <div class="cart-item-info">
          <h3>${product.name}</h3>
          <p>📍 ${product.city}, ${product.state}</p>
        </div>

        <span class="cart-item-price">${formatPrice(product.price)}</span>

        <button
          class="remove-button"
          onclick="removeFromCart('${product.id}')"
        >
          Remove
        </button>
      </div>
    `;
  });

  cartTotal.textContent = `Total: ${formatPrice(total)}`;
}

/* Seller Registration */

sellerButton.addEventListener("click", () => {
  formSuccess.textContent = "";
  openModal(sellerModal);
});

sellerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const sellerName = document.getElementById("sellerName").value;

  formSuccess.textContent =
    `Thank you, ${sellerName}! Your application has been submitted. ` +
    `Our कलाकनेक्ट team will verify your artisan profile, location, and craft details.`;

  sellerForm.reset();
});

/* Cart button */

cartButton.addEventListener("click", () => {
  renderCart();
  openModal(cartModal);
});

/* Demo checkout */

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;

  alert(
    "Demo order placed successfully!\\n\\n" +
    "In the complete कलाकनेक्ट platform, payment would remain secure " +
    "and be released to the artisan after delivery confirmation."
  );

  cart = [];
  saveCart();
  updateCartCount();
  renderCart();

  closeModal(cartModal);
});

/* Close buttons */

closeProductModal.addEventListener("click", () => {
  closeModal(productModal);
});

closeAuthModal.addEventListener("click", () => {
  closeModal(authModal);
});

closeSellerModal.addEventListener("click", () => {
  closeModal(sellerModal);
});

closeCartModal.addEventListener("click", () => {
  closeModal(cartModal);
});

/* Close modal when user clicks outside modal box */

[productModal, authModal, sellerModal, cartModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

/* Close modal when Escape key is pressed */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(productModal);
    closeModal(authModal);
    closeModal(sellerModal);
    closeModal(cartModal);
  }
});

/* Website first load */

displayProducts(products);
updateCartCount();