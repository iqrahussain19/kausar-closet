/**
 * Google Analytics 4 (GA4) — latest gtag.js implementation
 *
 * ============================================================
 * PASTE YOUR GA4 MEASUREMENT ID HERE (replace G-XXXXXXXXXX):
 * ============================================================
 */
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // ← PASTE YOUR GA4 MEASUREMENT ID HERE

(function () {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.info(
      "[GA4] Tracking is not active yet. Open js/analytics.js and replace G-XXXXXXXXXX with your Measurement ID."
    );
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" +
    encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(script);
})();
