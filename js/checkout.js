const ORDERS_KEY = "kausar_orders";
const SHIPPING_FEE = 250;
const FREE_SHIPPING_MIN = 10000;
const WHATSAPP_NUMBER = "923218581875";
const JAZZCASH_NUMBER = "03218581875";
const EASYPAISA_NUMBER = "03218581875";
const ORDER_EMAIL = "kausarcloset343@gmail.com";

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  jazzcash: "JazzCash",
  easypaisa: "EasyPaisa",
  whatsapp: "WhatsApp Order",
};

function getShippingFee(subtotal = getCartTotal()) {
  return subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
}

function getOrderTotal() {
  return getCartTotal() + getShippingFee();
}

function getCartLines() {
  return getCart()
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return null;
      return {
        id: product.id,
        name: product.name,
        size: item.size,
        quantity: item.quantity,
        price: product.price,
        lineTotal: product.price * item.quantity,
        image: product.image,
      };
    })
    .filter(Boolean);
}

function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  localStorage.setItem("kausar_last_order", JSON.stringify(order));
}

function createOrderId() {
  const stamp = Date.now().toString().slice(-8);
  const rand = Math.floor(Math.random() * 90 + 10);
  return `KC-${stamp}${rand}`;
}

function buildWhatsAppMessage(order) {
  const lines = order.items
    .map((item, index) => `${index + 1}. ${item.name} (Size ${item.size}) x${item.quantity} — ${formatPKR(item.lineTotal)}`)
    .join("%0A");

  return [
    `*New Order — Kausar Closet*`,
    `Order ID: ${order.id}`,
    ``,
    `*Customer*`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `City: ${order.customer.city}`,
    `Address: ${order.customer.address}`,
    order.customer.notes ? `Notes: ${order.customer.notes}` : null,
    ``,
    `*Items*`,
    lines,
    ``,
    `Subtotal: ${formatPKR(order.subtotal)}`,
    `Shipping: ${order.shipping ? formatPKR(order.shipping) : "Free"}`,
    `*Total: ${formatPKR(order.total)}*`,
    `Payment: ${PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}`,
  ]
    .filter(Boolean)
    .join("%0A");
}

function openWhatsAppOrder(order) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(order)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function renderCheckoutPage() {
  const root = document.querySelector("[data-checkout-root]");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "1") {
    renderCheckoutSuccess(root);
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    root.innerHTML = `
      <div class="empty-state">
        <h2>Your bag is empty</h2>
        <p>Add pieces to your bag before checking out.</p>
        <a class="btn btn-primary" href="shop.html">Shop the closet</a>
      </div>
    `;
    return;
  }

  const lines = getCartLines();
  const subtotal = getCartTotal();
  const shipping = getShippingFee(subtotal);
  const total = subtotal + shipping;

  root.innerHTML = `
    <form class="checkout-layout" data-checkout-form novalidate>
      <div class="checkout-main">
        <section class="checkout-card">
          <h2>Delivery details</h2>
          <div class="checkout-fields">
            <div class="field">
              <label for="fullName">Full name</label>
              <input id="fullName" name="fullName" type="text" required autocomplete="name" placeholder="Your full name" />
            </div>
            <div class="field">
              <label for="phone">Phone / WhatsApp</label>
              <input id="phone" name="phone" type="tel" required autocomplete="tel" placeholder="03XXXXXXXXX" />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" required autocomplete="email" placeholder="you@email.com" />
            </div>
            <div class="field">
              <label for="city">City</label>
              <input id="city" name="city" type="text" required autocomplete="address-level2" placeholder="Karachi, Lahore, Islamabad…" />
            </div>
            <div class="field field-full">
              <label for="address">Full address</label>
              <textarea id="address" name="address" required autocomplete="street-address" placeholder="House / street / area"></textarea>
            </div>
            <div class="field field-full">
              <label for="notes">Order notes (optional)</label>
              <textarea id="notes" name="notes" placeholder="Size help, delivery timing, gift note…"></textarea>
            </div>
          </div>
        </section>

        <section class="checkout-card">
          <h2>Payment method</h2>
          <div class="payment-options" role="radiogroup" aria-label="Payment method">
            <label class="payment-option">
              <input type="radio" name="payment" value="cod" checked />
              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay when your parcel arrives</small>
              </span>
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="jazzcash" />
              <span>
                <strong>JazzCash</strong>
                <small>Send to ${JAZZCASH_NUMBER}</small>
              </span>
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="easypaisa" />
              <span>
                <strong>EasyPaisa</strong>
                <small>Send to ${EASYPAISA_NUMBER}</small>
              </span>
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="whatsapp" />
              <span>
                <strong>WhatsApp Checkout</strong>
                <small>Confirm order directly on WhatsApp</small>
              </span>
            </label>
          </div>
          <p class="payment-note" data-payment-note>
            COD selected — pay in cash when your order is delivered.
          </p>
        </section>
      </div>

      <aside class="checkout-summary checkout-card">
        <h2>Order summary</h2>
        <div class="checkout-items">
          ${lines
            .map(
              (item) => `
            <div class="checkout-item">
              <img src="${item.image}" alt="" />
              <div>
                <strong>${item.name}</strong>
                <p>Size ${item.size} · Qty ${item.quantity}</p>
              </div>
              <span>${formatPKR(item.lineTotal)}</span>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="summary-row"><span>Subtotal</span><span>${formatPKR(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping ? formatPKR(shipping) : "Free"}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPKR(total)}</span></div>
        <p class="shipping-hint">${
          shipping
            ? `Free shipping on orders over ${formatPKR(FREE_SHIPPING_MIN)}`
            : "You’ve unlocked free shipping"
        }</p>
        <button type="submit" class="btn btn-primary btn-block" data-place-order>Place order</button>
        <a class="text-link" href="cart.html">Back to bag</a>
      </aside>
    </form>
  `;

  const form = root.querySelector("[data-checkout-form]");
  const note = root.querySelector("[data-payment-note]");

  const paymentNotes = {
    cod: "COD selected — pay in cash when your order is delivered.",
    jazzcash: `JazzCash selected — transfer to ${JAZZCASH_NUMBER}, then confirm on WhatsApp with your order ID.`,
    easypaisa: `EasyPaisa selected — transfer to ${EASYPAISA_NUMBER}, then confirm on WhatsApp with your order ID.`,
    whatsapp: "WhatsApp checkout — we’ll open WhatsApp with your full order details to confirm.",
  };

  form?.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (note) note.textContent = paymentNotes[input.value] || "";
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    handleCheckoutSubmit(form);
  });
}

function buildEmailBody(order) {
  const itemLines = order.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} | Size: ${item.size} | Qty: ${item.quantity} | ${formatPKR(item.lineTotal)}`
    )
    .join("\n");

  return [
    `New order received on Kausar Closet`,
    ``,
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    `Payment: ${PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}`,
    `Status: ${order.status}`,
    ``,
    `CUSTOMER`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Email: ${order.customer.email}`,
    `City: ${order.customer.city}`,
    `Address: ${order.customer.address}`,
    order.customer.notes ? `Notes: ${order.customer.notes}` : null,
    ``,
    `ITEMS`,
    itemLines,
    ``,
    `Subtotal: ${formatPKR(order.subtotal)}`,
    `Shipping: ${order.shipping ? formatPKR(order.shipping) : "Free"}`,
    `TOTAL: ${formatPKR(order.total)}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

async function sendOrderEmail(order) {
  const payload = {
    _subject: `New Kausar Closet Order ${order.id}`,
    _template: "table",
    _captcha: "false",
    name: order.customer.name,
    email: order.customer.email,
    phone: order.customer.phone,
    city: order.customer.city,
    address: order.customer.address,
    payment: PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod,
    order_id: order.id,
    subtotal: formatPKR(order.subtotal),
    shipping: order.shipping ? formatPKR(order.shipping) : "Free",
    total: formatPKR(order.total),
    message: buildEmailBody(order),
  };

  const response = await fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "Email failed to send");
  }

  return result;
}

async function handleCheckoutSubmit(form) {
  const data = new FormData(form);
  const fullName = String(data.get("fullName") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const email = String(data.get("email") || "").trim();
  const city = String(data.get("city") || "").trim();
  const address = String(data.get("address") || "").trim();
  const notes = String(data.get("notes") || "").trim();
  const paymentMethod = String(data.get("payment") || "cod");
  const submitBtn = form.querySelector("[data-place-order]");

  if (!fullName || !phone || !email || !city || !address) {
    showToast("Please fill all required fields");
    return;
  }

  if (!/^0?3\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
    showToast("Enter a valid Pakistani mobile number");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("Enter a valid email address");
    return;
  }

  const items = getCartLines();
  if (!items.length) {
    showToast("Your bag is empty");
    return;
  }

  const subtotal = getCartTotal();
  const shipping = getShippingFee(subtotal);
  const order = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    customer: { name: fullName, phone, email, city, address, notes },
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    paymentMethod,
    status: paymentMethod === "cod" || paymentMethod === "whatsapp" ? "confirmed" : "awaiting_payment",
    emailSent: false,
  };

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending order…";
  }

  try {
    await sendOrderEmail(order);
    order.emailSent = true;
    showToast("Order emailed to Kausar Closet");
  } catch (error) {
    console.error(error);
    order.emailSent = false;
    showToast("Order saved — activate FormSubmit email if needed");
  }

  saveOrder(order);
  saveCart([]);
  updateCartCount();

  if (paymentMethod === "whatsapp" || paymentMethod === "jazzcash" || paymentMethod === "easypaisa" || !order.emailSent) {
    openWhatsAppOrder(order);
  }

  window.location.href = `checkout.html?success=1&order=${encodeURIComponent(order.id)}&email=${
    order.emailSent ? "1" : "0"
  }`;
}

function renderCheckoutSuccess(root) {
  let order = null;
  try {
    order = JSON.parse(localStorage.getItem("kausar_last_order") || "null");
  } catch {
    order = null;
  }

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order") || order?.id || "KC-ORDER";
  const emailOk = params.get("email") === "1" || order?.emailSent;

  const payment = order?.paymentMethod || "cod";
  const paymentHint =
    payment === "jazzcash"
      ? `Please send ${formatPKR(order.total)} via JazzCash to ${JAZZCASH_NUMBER} and share the screenshot on WhatsApp.`
      : payment === "easypaisa"
        ? `Please send ${formatPKR(order.total)} via EasyPaisa to ${EASYPAISA_NUMBER} and share the screenshot on WhatsApp.`
        : payment === "whatsapp"
          ? "Your order details were sent to WhatsApp. Our team will confirm shortly."
          : "Your COD order is placed. We’ll call/WhatsApp you to confirm delivery.";

  root.innerHTML = `
    <div class="checkout-success">
      <p class="eyebrow">Thank you</p>
      <h2>Order placed successfully</h2>
      <p class="success-id">Order ID: <strong>${orderId}</strong></p>
      <p>${paymentHint}</p>
      <p class="email-status ${emailOk ? "is-ok" : "is-warn"}">
        ${
          emailOk
            ? `Order details were sent to <strong>${ORDER_EMAIL}</strong>.`
            : `Important: open <strong>${ORDER_EMAIL}</strong> inbox/spam and click the FormSubmit activation link, then place one more test order.`
        }
      </p>
      ${
        order
          ? `<div class="success-summary">
              <div class="summary-row"><span>Name</span><span>${order.customer.name}</span></div>
              <div class="summary-row"><span>Phone</span><span>${order.customer.phone}</span></div>
              <div class="summary-row"><span>Email</span><span>${order.customer.email || "—"}</span></div>
              <div class="summary-row"><span>Payment</span><span>${PAYMENT_LABELS[order.paymentMethod]}</span></div>
              <div class="summary-row total"><span>Total</span><span>${formatPKR(order.total)}</span></div>
            </div>`
          : ""
      }
      <div class="success-actions">
        <a class="btn btn-primary" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hi Kausar Closet, I placed order ${orderId}`
        )}" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        <a class="btn btn-ghost" href="shop.html">Continue shopping</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutPage();
});
