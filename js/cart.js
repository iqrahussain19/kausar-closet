const CART_KEY = "kausar_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
}

function addToCart(productId, quantity = 1, size = "M") {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId && item.size === size);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity, size });
  }

  saveCart(cart);
  showToast("Added to bag");
}

function removeFromCart(productId, size) {
  const cart = getCart().filter((item) => !(item.id === productId && item.size === size));
  saveCart(cart);
}

function updateCartItemQuantity(productId, size, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId && entry.size === size);
  if (!item) return;

  item.quantity = Math.max(1, quantity);
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(getCartCount());
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function renderCartPage() {
  const root = document.querySelector("[data-cart-root]");
  if (!root) return;

  const cart = getCart();

  if (!cart.length) {
    root.innerHTML = `
      <div class="empty-state">
        <h2>Your bag is empty</h2>
        <p>Discover soft stitched and unstitched pieces for your everyday glow.</p>
        <a class="btn btn-primary" href="shop.html">Shop the closet</a>
      </div>
    `;
    return;
  }

  const rows = cart
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return "";
      return `
        <article class="cart-row" data-id="${product.id}" data-size="${item.size}">
          <a class="cart-thumb" href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </a>
          <div class="cart-info">
            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p>Size: ${item.size}</p>
            <p class="price">${formatPKR(product.price)}</p>
          </div>
          <div class="cart-qty">
            <button type="button" data-qty-minus aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-qty-plus aria-label="Increase quantity">+</button>
          </div>
          <p class="cart-line-total">${formatPKR(product.price * item.quantity)}</p>
          <button type="button" class="cart-remove" data-remove aria-label="Remove item">×</button>
        </article>
      `;
    })
    .join("");

  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-list">${rows}</div>
      <aside class="cart-summary">
        <h2>Order summary</h2>
        <div class="summary-row"><span>Subtotal</span><span>${formatPKR(getCartTotal())}</span></div>
        <div class="summary-row"><span>Shipping</span><span>From Rs. 250</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPKR(getCartTotal())}</span></div>
        <a class="btn btn-primary btn-block" href="checkout.html">Proceed to checkout</a>
        <a class="text-link" href="shop.html">Continue shopping</a>
      </aside>
    </div>
  `;

  root.querySelectorAll(".cart-row").forEach((row) => {
    const id = row.dataset.id;
    const size = row.dataset.size;

    row.querySelector("[data-qty-minus]")?.addEventListener("click", () => {
      const item = getCart().find((entry) => entry.id === id && entry.size === size);
      if (item) updateCartItemQuantity(id, size, item.quantity - 1);
      renderCartPage();
    });

    row.querySelector("[data-qty-plus]")?.addEventListener("click", () => {
      const item = getCart().find((entry) => entry.id === id && entry.size === size);
      if (item) updateCartItemQuantity(id, size, item.quantity + 1);
      renderCartPage();
    });

    row.querySelector("[data-remove]")?.addEventListener("click", () => {
      removeFromCart(id, size);
      renderCartPage();
    });
  });
}
