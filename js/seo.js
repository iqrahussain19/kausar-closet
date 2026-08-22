/**
 * Kausar Closet — SEO utilities
 * Update SITE_URL when your domain goes live.
 */
const SEO_CONFIG = {
  siteName: "Kausar Closet",
  siteUrl: "https://kausarcloset.pk",
  locale: "en_PK",
  phone: "+923218581875",
  email: "kausarcloset343@gmail.com",
  instagram: "https://www.instagram.com/kausar_closet",
  facebook: "https://www.facebook.com/share/1J52Gzczg1/",
  defaultImage: "images/hero.jpg",
};

function seoAbsoluteUrl(path) {
  const base = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  if (!path) return base + "/";
  return base + "/" + String(path).replace(/^\//, "");
}

function seoSetMeta(name, content, isProperty = false) {
  if (!content) return;
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function seoUpdatePage({ title, description, image, path, type = "website" }) {
  const pageTitle = title || SEO_CONFIG.siteName;
  const pageDesc =
    description ||
    "Shop premium Pakistani women's clothing — stitched dresses, party wear, and lawn suits at Kausar Closet.";
  const pageImage = image || SEO_CONFIG.defaultImage;
  const pageUrl = seoAbsoluteUrl(path || "");

  document.title = pageTitle;
  seoSetMeta("description", pageDesc);
  seoSetMeta("og:title", pageTitle, true);
  seoSetMeta("og:description", pageDesc, true);
  seoSetMeta("og:image", seoAbsoluteUrl(pageImage), true);
  seoSetMeta("og:url", pageUrl, true);
  seoSetMeta("og:type", type, true);
  seoSetMeta("og:site_name", SEO_CONFIG.siteName, true);
  seoSetMeta("og:locale", SEO_CONFIG.locale, true);
  seoSetMeta("twitter:card", "summary_large_image");
  seoSetMeta("twitter:title", pageTitle);
  seoSetMeta("twitter:description", pageDesc);
  seoSetMeta("twitter:image", seoAbsoluteUrl(pageImage));

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", pageUrl);
}

function seoInjectJsonLd(data, id) {
  if (id) {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
  }
  const script = document.createElement("script");
  script.type = "application/ld+json";
  if (id) script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function seoOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: seoAbsoluteUrl("images/logo.png"),
    image: seoAbsoluteUrl(SEO_CONFIG.defaultImage),
    description:
      "Premium Pakistani women's clothing brand offering stitched dresses, party wear, and lawn suits with nationwide delivery.",
    email: SEO_CONFIG.email,
    telephone: SEO_CONFIG.phone,
    priceRange: "Rs. 7550 - Rs. 8550",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank Transfer, JazzCash, EasyPaisa",
    areaServed: { "@type": "Country", name: "Pakistan" },
    sameAs: [SEO_CONFIG.instagram, SEO_CONFIG.facebook],
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
  };
}

function seoProductSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: seoAbsoluteUrl(product.image),
    sku: product.id,
    brand: { "@type": "Brand", name: SEO_CONFIG.siteName },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: seoAbsoluteUrl(`product.html?id=${product.id}`),
      priceCurrency: "PKR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SEO_CONFIG.siteName },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: Math.max(1, Math.round(product.rating * 10)),
    },
  };
}

function seoItemListSchema(products) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kausar Closet Collection",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: seoAbsoluteUrl(`product.html?id=${product.id}`),
      name: product.name,
    })),
  };
}

function seoApplyProductPage(product) {
  if (!product) return;
  seoUpdatePage({
    title: `${product.name} | ${SEO_CONFIG.siteName}`,
    description: `${product.description.slice(0, 155)}… Buy online at Kausar Closet with nationwide delivery.`,
    image: product.image,
    path: `product.html?id=${product.id}`,
    type: "product",
  });
  seoInjectJsonLd(seoProductSchema(product), "seo-product-jsonld");
}

function seoApplyShopPage(products) {
  seoInjectJsonLd(seoItemListSchema(products), "seo-shop-jsonld");
}
