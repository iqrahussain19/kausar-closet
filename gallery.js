function gallerySlideAlt(productName, index, total) {
  if (index === 0) return `${productName} — model wearing dress`;
  if (index === 1) return `${productName} — dress detail`;
  return `${productName} — same dress, angle ${index} of ${total}`;
}

/**
 * Product image gallery — swipeable carousel with thumbnails.
 */
function initProductGallery(galleryEl, images, productName) {
  if (!galleryEl || !images?.length) return;

  let activeIndex = 0;
  let touchStartX = 0;
  let touchDeltaX = 0;
  let isDragging = false;
  let mouseDown = false;

  galleryEl.innerHTML = `
    <div class="gallery-carousel" data-gallery-carousel>
      <button type="button" class="gallery-nav gallery-nav-prev" data-gallery-prev aria-label="Previous image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <div class="gallery-viewport" data-gallery-viewport>
        <div class="gallery-track" data-gallery-track>
          ${images
            .map(
              (src, index) => `
            <figure class="gallery-slide" data-slide="${index}">
              <img
                src="${src}"
                alt="${gallerySlideAlt(productName, index, images.length)}"
                loading="${index === 0 ? "eager" : "lazy"}"
                draggable="false"
              />
            </figure>
          `
            )
            .join("")}
        </div>
      </div>
      <button type="button" class="gallery-nav gallery-nav-next" data-gallery-next aria-label="Next image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
      <div class="gallery-dots" role="tablist" aria-label="Product image views">
        ${images
          .map(
            (_, index) => `
          <button
            type="button"
            class="gallery-dot${index === 0 ? " is-active" : ""}"
            data-gallery-dot="${index}"
            role="tab"
            aria-selected="${index === 0}"
            aria-label="View image ${index + 1}"
          ></button>
        `
          )
          .join("")}
      </div>
    </div>
    <div class="gallery-thumbs" role="tablist" aria-label="Product thumbnails">
      ${images
        .map(
          (src, index) => `
        <button
          type="button"
          class="gallery-thumb${index === 0 ? " is-active" : ""}"
          data-gallery-thumb="${index}"
          role="tab"
          aria-selected="${index === 0}"
          aria-label="${productName} thumbnail ${index + 1}"
        >
          <img src="${src}" alt="" loading="lazy" draggable="false" />
        </button>
      `
        )
        .join("")}
    </div>
  `;

  galleryEl.setAttribute("tabindex", "0");

  const viewport = galleryEl.querySelector("[data-gallery-viewport]");
  const track = galleryEl.querySelector("[data-gallery-track]");
  const dots = () => galleryEl.querySelectorAll("[data-gallery-dot]");
  const thumbs = () => galleryEl.querySelectorAll("[data-gallery-thumb]");

  const setActiveUI = () => {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    dots().forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
    thumbs().forEach((thumb, index) => {
      const isActive = index === activeIndex;
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-selected", String(isActive));
    });
  };

  const goTo = (index) => {
    activeIndex = (index + images.length) % images.length;
    track.style.transition = "";
    setActiveUI();
  };

  const finishDrag = () => {
    if (!track || !viewport) return;
    isDragging = false;
    mouseDown = false;
    track.style.transition = "";
    const threshold = viewport.offsetWidth * 0.18;
    if (touchDeltaX <= -threshold) goTo(activeIndex + 1);
    else if (touchDeltaX >= threshold) goTo(activeIndex - 1);
    else setActiveUI();
    touchDeltaX = 0;
  };

  galleryEl.querySelector("[data-gallery-prev]")?.addEventListener("click", () => goTo(activeIndex - 1));
  galleryEl.querySelector("[data-gallery-next]")?.addEventListener("click", () => goTo(activeIndex + 1));

  galleryEl.querySelectorAll("[data-gallery-dot]").forEach((dot) => {
    dot.addEventListener("click", () => goTo(Number(dot.dataset.galleryDot)));
  });

  galleryEl.querySelectorAll("[data-gallery-thumb]").forEach((thumb) => {
    thumb.addEventListener("click", () => goTo(Number(thumb.dataset.galleryThumb)));
  });

  viewport?.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    isDragging = true;
    touchStartX = event.touches[0].clientX;
    touchDeltaX = 0;
    track.style.transition = "none";
  }, { passive: true });

  viewport?.addEventListener("touchmove", (event) => {
    if (!isDragging || event.touches.length !== 1) return;
    touchDeltaX = event.touches[0].clientX - touchStartX;
    const offset = -activeIndex * 100 + (touchDeltaX / viewport.offsetWidth) * 100;
    track.style.transform = `translateX(${offset}%)`;
  }, { passive: true });

  viewport?.addEventListener("touchend", finishDrag);
  viewport?.addEventListener("touchcancel", finishDrag);

  viewport?.addEventListener("mousedown", (event) => {
    mouseDown = true;
    isDragging = true;
    touchStartX = event.clientX;
    touchDeltaX = 0;
    track.style.transition = "none";
  });

  window.addEventListener("mousemove", (event) => {
    if (!mouseDown || !track) return;
    touchDeltaX = event.clientX - touchStartX;
    const offset = -activeIndex * 100 + (touchDeltaX / viewport.offsetWidth) * 100;
    track.style.transform = `translateX(${offset}%)`;
  });

  window.addEventListener("mouseup", () => {
    if (!mouseDown) return;
    finishDrag();
  });

  galleryEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
  });

  setActiveUI();
}
