document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileChrome();
  updateCartCount();
  renderHomeCollections();
  renderProductGrid("[data-featured-products]", PRODUCTS.slice(0, 8));
  renderProductPage();
  renderCartPage();
  initContactForm();
  initReveal();
});

function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const dropdownItem = document.querySelector(".has-dropdown");
  const dropdownToggle = document.querySelector("[data-dropdown-toggle]");

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(Boolean(open)));
    document.body.classList.toggle("nav-open", Boolean(open));
    if (!open) {
      dropdownItem?.classList.remove("is-open");
      dropdownToggle?.setAttribute("aria-expanded", "false");
    }
  });

  dropdownToggle?.addEventListener("click", (event) => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      event.preventDefault();
      const open = dropdownItem?.classList.toggle("is-open");
      dropdownToggle.setAttribute("aria-expanded", String(Boolean(open)));
    }
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.hasAttribute("data-dropdown-toggle") && window.matchMedia("(max-width: 760px)").matches) {
        return;
      }
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      dropdownItem?.classList.remove("is-open");
      dropdownToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}


function initMobileChrome() {
  if (document.querySelector(".mobile-tabbar")) return;

  const path = window.location.pathname.split("/").pop() || "index.html";
  const isHome = path === "" || path === "index.html";
  const isShop = path === "shop.html" || path === "product.html";
  const isCart = path === "cart.html" || path === "checkout.html";
  const isAccount = path === "contact.html" || path === "about.html";

  const tabbar = document.createElement("nav");
  tabbar.className = "mobile-tabbar";
  tabbar.setAttribute("aria-label", "Mobile");
  tabbar.innerHTML = `
    <a class="tab-item ${isHome ? "is-active" : ""}" href="index.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"/></svg>
      <span>Home</span>
    </a>
    <a class="tab-item ${isShop ? "is-active" : ""}" href="shop.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 7h14l-1.2 13H6.2L5 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
      <span>Shop</span>
    </a>
    <button class="tab-item" type="button" data-mobile-search>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>
      <span>Search</span>
    </button>
    <a class="tab-item ${isCart ? "is-active" : ""}" href="cart.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
      <span>Bag</span>
      <em class="tab-badge" data-cart-count>0</em>
    </a>
    <a class="tab-item ${isAccount ? "is-active" : ""}" href="contact.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19.2a6.5 6.5 0 0 1 13 0"/></svg>
      <span>Account</span>
    </a>
  `;
  document.body.appendChild(tabbar);

  if (!document.querySelector(".mobile-promo")) {
    const promo = document.createElement("div");
    promo.className = "mobile-promo";
    promo.innerHTML = `<p>SALE UP TO 20% OFF · Free shipping over Rs. 10,000</p>`;
    const header = document.querySelector(".site-header");
    header?.parentNode?.insertBefore(promo, header);
  }

  tabbar.querySelector("[data-mobile-search]")?.addEventListener("click", () => {
    if (path === "shop.html") {
      document.querySelector("[data-search]")?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "shop.html?focus=search";
    }
  });

  updateCartCount();
}

function initReveal() {
  const items = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
  );

  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight + 80 && rect.bottom > -40;
    if (inView) {
      el.classList.add("is-visible");
    } else {
      observer.observe(el);
    }
  });
}

function renderHomeCollections() {
  const root = document.querySelector("[data-categories]");
  if (!root) return;

  root.innerHTML = CATEGORIES.map(
    (cat) => `
      <a class="category-tile reveal" href="shop.html?category=${cat.id}">
        <img src="${cat.image}" alt="${cat.name} collection" loading="lazy" />
        <div class="category-copy">
          <span class="category-label">${cat.name}</span>
          <span class="category-cta">Shop now</span>
        </div>
      </a>
    `
  ).join("");
}

function createProductCard(product) {
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return `
    <article class="product-card reveal">
      <a class="product-media" href="product.html?id=${product.id}">
        <img class="product-img primary" src="${product.image}" alt="${product.name}" loading="lazy" />
        <img class="product-img secondary" src="${product.hoverImage}" alt="" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        ${discount ? `<span class="product-discount">-${discount}%</span>` : ""}
      </a>
      <button type="button" class="wish-btn" data-wish="${product.id}" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 20s-7-4.4-7-9.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7 3.6C19 15.6 12 20 12 20z"/></svg>
      </button>
      <div class="product-body">
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-meta">
          <span class="price">${formatPKR(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${formatPKR(product.oldPrice)}</span>` : ""}
        </div>
        <button type="button" class="btn btn-ghost" data-add="${product.id}">Add to bag</button>
      </div>
    </article>
  `;
}

function renderProductGrid(selector, products) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = products.map(createProductCard).join("");
  root.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add));
  });
  root.querySelectorAll("[data-wish]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-active");
      showToast(btn.classList.contains("is-active") ? "Saved to wishlist" : "Removed from wishlist");
    });
  });
}

function renderProductPage() {
  const root = document.querySelector("[data-product-detail]");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id")) || PRODUCTS[0];

  document.title = `${product.name} | Kausar Closet`;


  root.innerHTML = `
    <div class="product-gallery">
      <img src="${product.image}" alt="${product.name}" id="product-main-image" />
      <div class="product-thumbs">
        <button type="button" class="is-active" data-thumb="${product.image}">
          <img src="${product.image}" alt="" />
        </button>
        <button type="button" data-thumb="${product.hoverImage}">
          <img src="${product.hoverImage}" alt="" />
        </button>
      </div>
    </div>
    <div class="product-detail-info">
      ${product.badge ? `<p class="eyebrow">${product.badge}</p>` : ""}
      <h1>${product.name}</h1>
      <div class="product-meta">
        <span class="price">${formatPKR(product.price)}</span>
        ${product.oldPrice ? `<span class="price-old">${formatPKR(product.oldPrice)}</span>` : ""}
      </div>
      <p class="product-desc">${product.description}</p>
      <p class="product-spec"><strong>Fabric:</strong> ${product.fabric}</p>
      <p class="product-spec"><strong>Season:</strong> ${product.season}</p>
      <fieldset class="size-field">
        <legend>Select size</legend>
        <div class="size-options">
          ${product.sizes
            .map(
              (size, index) => `
                <label>
                  <input type="radio" name="size" value="${size}" ${index === 0 ? "checked" : ""} />
                  <span>${size}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </fieldset>
      <div class="qty-field">
        <label for="qty">Quantity</label>
        <div class="cart-qty">
          <button type="button" data-detail-minus>−</button>
          <input id="qty" type="number" min="1" value="1" />
          <button type="button" data-detail-plus>+</button>
        </div>
      </div>
      <div class="product-actions">
        <button type="button" class="btn btn-primary" data-detail-add>Add to bag</button>
        <a class="btn btn-outline" href="shop.html">Continue shopping</a>
      </div>
    </div>
  `;

  const mainImage = root.querySelector("#product-main-image");
  root.querySelectorAll("[data-thumb]").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll("[data-thumb]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      if (mainImage) mainImage.src = btn.dataset.thumb;
    });
  });

  const qtyInput = root.querySelector("#qty");
  root.querySelector("[data-detail-minus]")?.addEventListener("click", () => {
    qtyInput.value = String(Math.max(1, Number(qtyInput.value) - 1));
  });
  root.querySelector("[data-detail-plus]")?.addEventListener("click", () => {
    qtyInput.value = String(Number(qtyInput.value) + 1);
  });

  root.querySelector("[data-detail-add]")?.addEventListener("click", () => {
    const size = root.querySelector('input[name="size"]:checked')?.value || product.sizes[0];
    addToCart(product.id, Number(qtyInput.value) || 1, size);
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      showToast("Please complete all fields");
      return;
    }

    form.reset();
    showToast("Message sent — we’ll reply soon");
  });
}
