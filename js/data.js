/** Listing placeholders — keep these PNGs in shop/home thumbnails */
const IMG = {
  dress01: "images/dresses/openart-gpt-image-2-edit-1_1781247168605_93f8f8d8-4ba07b5d-21bb-4611-be1c-ada21c6b756f.png",
  dress02: "images/dresses/openart-gpt-image-2-edit-1_1781247405779_ece7c809-76edd102-9fc7-47de-b221-4cb760f523ff.png",
  dress03: "images/dresses/ChatGPT_Image_Jun_12__2026__12_09_13_PM-4ccfb192-ed23-46f2-8f4c-86222f01ee28.png",
  dress04: "images/dresses/ChatGPT_Image_Jun_12__2026__12_15_43_PM-2d83cd5f-b2a1-4560-ad43-c1e8fb4c5774.png",
  dress05: "images/dresses/ChatGPT_Image_Jun_12__2026__12_18_59_PM-d9ed36e4-d057-4223-8200-35a41bc79ed8.png",
  dress06: "images/dresses/ChatGPT_Image_Jun_12__2026__12_21_53_PM-acbcbb9b-b437-4c44-b190-1f8b310de6d7.png",
  dress07: "images/dresses/Gemini_Generated_Image_ppmfowppmfowppmf-2f299308-337a-46da-9046-ed47f07273a7.png",
};

/** Actual product photos for detail-page gallery only: images/dresses/kc-XX/01.jpg … */
function dressGallery(productId, imageCount) {
  return Array.from({ length: imageCount }, (_, i) =>
    `images/dresses/${productId}/${String(i + 1).padStart(2, "0")}.jpg`
  );
}

const PRODUCTS = [
  {
    id: "kc-01",
    name: "Teal Digital Printed Lawn 3-Piece",
    price: 8550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Lawn",
    colors: ["Teal"],
    sizes: ["M", "L"],
    rating: 4.9,
    badge: "New",
    image: "images/Blue 1.jpeg",
    hoverImage: "images/Blue 2.jpeg",
    images: ["images/Blue 2.jpeg"],
    description:
      "Digital printed premium lawn 3-piece suit with lace and pearl embellished neckline, floral placement design, chiffon dupatta, and straight trouser. Available in Medium and Large.",
  },
  {
    id: "kc-02",
    name: "Purple Embroidered Formal Suit",
    price: 7550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Cotton Blend",
    colors: ["Purple", "White"],
    sizes: ["M", "L"],
    rating: 4.8,
    badge: "New",
    image: IMG.dress02,
    hoverImage: IMG.dress02,
    images: [
      "images/dresses/kc-02/02.jpg",
      "images/dresses/kc-02/03.jpg",
      "images/dresses/kc-02/04.jpg",
    ],
    description:
      "Elegant deep purple kameez with white floral embroidery, matching trousers, and a sheer white dupatta with lace borders. Available in Medium and Large.",
  },
  {
    id: "kc-03",
    name: "Floral Rose Lawn Ensemble",
    price: 8550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Lawn",
    colors: ["Ivory", "Blush Pink"],
    sizes: ["M", "L"],
    rating: 4.9,
    badge: "Bestseller",
    image: IMG.dress03,
    hoverImage: IMG.dress03,
    images: [
      "images/dresses/kc-03/02.jpg",
      "images/dresses/kc-03/03.jpg",
      "images/dresses/kc-03/04.jpg",
      "images/dresses/kc-03/05.jpg",
      "images/dresses/kc-03/06.jpg",
    ],
    description:
      "White lawn kameez with rose bouquet prints, soft pink trousers, and a pure white chiffon dupatta. Delicate lace trim and pearl button detailing. Available in Medium and Large.",
  },
  {
    id: "kc-04",
    name: "Royal Blue Embroidered Suit",
    price: 8550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Royal Blue", "Silver"],
    sizes: ["M", "L"],
    rating: 4.8,
    badge: "Bestseller",
    image: IMG.dress04,
    hoverImage: IMG.dress04,
    images: [
      "images/dresses/kc-04/02.jpg",
      "images/dresses/kc-04/03.jpg",
      "images/dresses/kc-04/04.jpg",
      "images/dresses/kc-04/05.jpg",
    ],
    description:
      "Vibrant royal blue 3-piece suit with intricate silver embroidery, off-white chiffon dupatta, and straight trousers. A statement piece for festive occasions. Available in Medium and Large.",
  },
  {
    id: "kc-05",
    name: "Peach Embroidered Formal Suit",
    price: 8550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Peach"],
    sizes: ["M", "L"],
    rating: 4.7,
    badge: null,
    image: IMG.dress05,
    hoverImage: IMG.dress05,
    images: [
      "images/dresses/kc-05/02.jpg",
      "images/dresses/kc-05/03.jpg",
      "images/dresses/kc-05/04.jpg",
    ],
    description:
      "Soft peach 3-piece suit with fine silver-white embroidery, sheer dupatta, and straight-cut trousers. Elegant and refined for formal gatherings. Available in Medium and Large.",
  },
  {
    id: "kc-06",
    name: "Lilac Grey Embroidered Suit",
    price: 8550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Grey", "Lilac"],
    sizes: ["M", "L"],
    rating: 4.8,
    badge: null,
    image: IMG.dress06,
    hoverImage: IMG.dress06,
    images: [
      "images/dresses/kc-06/02.jpg",
      "images/dresses/kc-06/03.jpg",
      "images/dresses/kc-06/04.jpg",
      "images/dresses/kc-06/05.jpg",
    ],
    description:
      "Sophisticated grey-lilac 3-piece suit with multi-toned floral embroidery, sheer dupatta, and embroidered trouser borders. Available in Medium and Large.",
  },
  {
    id: "kc-07",
    name: "Coral Festive Embroidered Suit",
    price: 8550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Coral"],
    sizes: ["M", "L"],
    rating: 5,
    badge: "New",
    image: IMG.dress07,
    hoverImage: IMG.dress07,
    images: [
      "images/dresses/kc-07/02.jpg",
      "images/dresses/kc-07/03.jpg",
      "images/dresses/kc-07/04.jpg",
      "images/dresses/kc-07/05.jpg",
    ],
    description:
      "Vibrant coral red 3-piece Pakistani suit with gold embroidery, matching dupatta with gold border, and traditional khussa-ready styling. Available in Medium and Large.",
  },
  {
    id: "kc-08",
    name: "Dusty Blue Sequinned Party Wear Saree",
    price: 8999,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Net & Satin",
    colors: ["Dusty Blue", "Silver"],
    sizes: ["M", "L"],
    rating: 4.9,
    badge: "New",
    image: "images/dresses/kc-08/03.jpg",
    hoverImage: "images/dresses/kc-08/01.jpg",
    images: [
      "images/dresses/kc-08/01.jpg",
      "images/dresses/kc-08/02.jpg",
    ],
    description:
      "Elegant dusty blue party wear saree with sequinned diamond-grid net pallu, ornate scalloped silver border, and matching satin blouse. Front, side, and back poses included. Available in Medium and Large.",
  },
  {
    id: "kc-09",
    name: "Mauve Gold Embroidered Party Wear Gown",
    price: 8550,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Net",
    colors: ["Mauve", "Gold"],
    sizes: ["S"],
    rating: 4.9,
    badge: "New",
    image: "images/dresses/kc-09/01.jpg",
    hoverImage: "images/dresses/kc-09/02.jpg",
    images: [
      "images/dresses/kc-09/02.jpg",
      "images/dresses/kc-09/03.jpg",
    ],
    description:
      "Dusty mauve Anarkali party wear gown with heavy gold embroidery on the bodice and hem, sheer sleeves, lattice-work dupatta, and scalloped border. Available in Small.",
  },
  {
    id: "kc-10",
    name: "Burgundy Gold Embroidered Party Wear Suit",
    price: 8550,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Net & Chiffon",
    colors: ["Burgundy", "Gold"],
    sizes: ["M"],
    rating: 4.9,
    badge: "New",
    image: "images/dresses/kc-10/01.jpg",
    hoverImage: "images/dresses/kc-10/02.jpg",
    images: [
      "images/dresses/kc-10/02.jpg",
      "images/dresses/kc-10/03.jpg",
    ],
    description:
      "Deep burgundy Anarkali 3-piece party wear suit with dense antique gold embroidery on the bodice, hem, and sleeves, matching wide-leg trousers, and a sheer embroidered dupatta. Available in Medium only.",
  },
  {
    id: "kc-11",
    name: "Plain Marina 3-Piece Suit with Yellow Shawl",
    price: 11999,
    oldPrice: null,
    category: "stitched",
    season: "winter",
    fabric: "Marina",
    colors: ["Purple", "Mustard Yellow"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    badge: "New",
    image: "images/dresses/kc-11/01.jpg",
    hoverImage: "images/dresses/kc-11/02.jpg",
    images: [
      "images/dresses/kc-11/02.jpg",
      "images/dresses/kc-11/03.jpg",
    ],
    description:
      "Plain marina 3-piece winter suit in deep purple with matching trousers and a textured mustard yellow marina shawl. Soft, warm fabric for everyday winter wear. Available in Small, Medium, and Large.",
  },
  {
    id: "kc-12",
    name: "Plain Marina Blue Suit with Lehnga & Chiffon Dupatta",
    price: 9999,
    oldPrice: null,
    category: "stitched",
    season: "winter",
    fabric: "Marina & Chiffon",
    colors: ["Navy Blue"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    badge: "New",
    image: "images/dresses/kc-12/01.jpg",
    hoverImage: "images/dresses/kc-12/02.jpg",
    images: [
      "images/dresses/kc-12/02.jpg",
      "images/dresses/kc-12/03.jpg",
    ],
    description:
      "Plain marina blue 3-piece winter suit with shirt and flared lehnga in marina fabric, finished with a matching chiffon dupatta. Available in Small, Medium, and Large.",
  },
];

const CATEGORIES = [
  { id: "stitched", name: "Stitched", image: IMG.dress01 },
  { id: "partywear", name: "Party Wear", image: "images/dresses/kc-08/03.jpg" },
  { id: "unstitched", name: "Unstitched", image: IMG.dress03 },
  { id: "summer", name: "Summer", image: IMG.dress03 },
  { id: "winter", name: "Winter", image: "images/dresses/kc-11/01.jpg" },
];

function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/** Detail-page gallery: model/hero shot first, then same-dress photo angles. */
function getProductImages(product) {
  const angles = product.images?.length ? product.images : [];
  if (!product.image) return angles;
  // Slide 1 = listing model shot; slides 2+ = actual photos of the same dress (kc-XX folder)
  return [product.image, ...angles];
}
