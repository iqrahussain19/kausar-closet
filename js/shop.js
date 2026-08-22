document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-shop-grid]");
  if (!grid) return;

  const searchInput = document.querySelector("[data-search]");
  const categorySelect = document.querySelector("[data-filter-category]");
  const seasonSelect = document.querySelector("[data-filter-season]");
  const sortSelect = document.querySelector("[data-sort]");
  const resultCount = document.querySelector("[data-result-count]");

  const params = new URLSearchParams(window.location.search);
  if (params.get("category") && categorySelect) {
    categorySelect.value = params.get("category");
  }
  if (params.get("season") && seasonSelect) {
    seasonSelect.value = params.get("season");
  }
  if (params.get("q") && searchInput) {
    searchInput.value = params.get("q");
  }
  if (params.get("focus") === "search" && searchInput) {
    setTimeout(() => searchInput.focus(), 200);
  }

  const applyFilters = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const category = categorySelect?.value || "all";
    const season = seasonSelect?.value || "all";
    const sort = sortSelect?.value || "latest";

    let items = PRODUCTS.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.fabric.toLowerCase().includes(query) ||
        product.category.includes(query);

      const matchesCategory =
        category === "all" ||
        product.category === category ||
        (category === "summer" && product.season === "summer") ||
        (category === "winter" && product.season === "winter");

      const matchesSeason = season === "all" || product.season === season;

      return matchesQuery && matchesCategory && matchesSeason;
    });

    items = [...items].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "bestselling") return b.rating - a.rating;
      return 0;
    });

    if (resultCount) {
      resultCount.textContent = `${items.length} piece${items.length === 1 ? "" : "s"}`;
    }

    if (!items.length) {
      grid.innerHTML = `
        <div class="empty-state shop-empty">
          <h2>No pieces found</h2>
          <p>Try another fabric, season, or clear your filters.</p>
        </div>
      `;
      return;
    }

    renderProductGrid("[data-shop-grid]", items);
    initReveal();
  };

  [searchInput, categorySelect, seasonSelect, sortSelect].forEach((el) => {
    el?.addEventListener("input", applyFilters);
    el?.addEventListener("change", applyFilters);
  });

  applyFilters();

  if (typeof seoApplyShopPage === "function") {
    seoApplyShopPage(PRODUCTS);
  }
});
