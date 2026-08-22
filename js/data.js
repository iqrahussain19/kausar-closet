const IMG = {
  dress01: "images/dresses/openart-gpt-image-2-edit-1_1781247168605_93f8f8d8-4ba07b5d-21bb-4611-be1c-ada21c6b756f.png",
  dress02: "images/dresses/openart-gpt-image-2-edit-1_1781247405779_ece7c809-76edd102-9fc7-47de-b221-4cb760f523ff.png",
  dress03: "images/dresses/ChatGPT_Image_Jun_12__2026__12_09_13_PM-4ccfb192-ed23-46f2-8f4c-86222f01ee28.png",
  dress04: "images/dresses/ChatGPT_Image_Jun_12__2026__12_15_43_PM-2d83cd5f-b2a1-4560-ad43-c1e8fb4c5774.png",
  dress05: "images/dresses/ChatGPT_Image_Jun_12__2026__12_18_59_PM-d9ed36e4-d057-4223-8200-35a41bc79ed8.png",
  dress06: "images/dresses/ChatGPT_Image_Jun_12__2026__12_21_53_PM-acbcbb9b-b437-4c44-b190-1f8b310de6d7.png",
  dress07: "images/dresses/Gemini_Generated_Image_ppmfowppmfowppmf-2f299308-337a-46da-9046-ed47f07273a7.png",
};

const PRODUCTS = [
  {
    id: "kc-01",
    name: "Teal Digital Printed Lawn 3-Piece",
    price: 7550,
    oldPrice: null,
    category: "stitched",
    season: "summer",
    fabric: "Lawn",
    colors: ["Teal"],
    sizes: ["S", "M"],
    rating: 4.9,
    badge: "New",
    image: IMG.dress01,
    hoverImage: IMG.dress01,
    description:
      "Digital printed premium lawn 3-piece suit with lace and pearl embellished neckline, floral placement design, chiffon dupatta, and straight trouser. Available in Small and Medium.",
  },
  {
    id: "kc-02",
    name: "Purple Embroidered Formal Suit",
    price: 7550,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Cotton Blend",
    colors: ["Purple", "White"],
    sizes: ["S", "M"],
    rating: 4.8,
    badge: "New",
    image: IMG.dress02,
    hoverImage: IMG.dress02,
    description:
      "Elegant deep purple kameez with white floral embroidery, matching trousers, and a sheer white dupatta with lace borders. Available in Small and Medium.",
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
    sizes: ["S", "M"],
    rating: 4.9,
    badge: "Bestseller",
    image: IMG.dress03,
    hoverImage: IMG.dress03,
    description:
      "White lawn kameez with rose bouquet prints, soft pink trousers, and a pure white chiffon dupatta. Delicate lace trim and pearl button detailing. Available in Small and Medium.",
  },
  {
    id: "kc-04",
    name: "Royal Blue Embroidered Suit",
    price: 8550,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Royal Blue", "Silver"],
    sizes: ["S", "M"],
    rating: 4.8,
    badge: "Bestseller",
    image: IMG.dress04,
    hoverImage: IMG.dress04,
    description:
      "Vibrant royal blue 3-piece suit with intricate silver embroidery, off-white chiffon dupatta, and straight trousers. A statement piece for festive occasions. Available in Small and Medium.",
  },
  {
    id: "kc-05",
    name: "Peach Embroidered Formal Suit",
    price: 8550,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Peach"],
    sizes: ["S", "M"],
    rating: 4.7,
    badge: null,
    image: IMG.dress05,
    hoverImage: IMG.dress05,
    description:
      "Soft peach 3-piece suit with fine silver-white embroidery, sheer dupatta, and straight-cut trousers. Elegant and refined for formal gatherings. Available in Small and Medium.",
  },
  {
    id: "kc-06",
    name: "Lilac Grey Embroidered Suit",
    price: 8550,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Grey", "Lilac"],
    sizes: ["S", "M"],
    rating: 4.8,
    badge: null,
    image: IMG.dress06,
    hoverImage: IMG.dress06,
    description:
      "Sophisticated grey-lilac 3-piece suit with multi-toned floral embroidery, sheer dupatta, and embroidered trouser borders. Available in Small and Medium.",
  },
  {
    id: "kc-07",
    name: "Coral Festive Embroidered Suit",
    price: 8550,
    oldPrice: null,
    category: "partywear",
    season: "summer",
    fabric: "Premium Fabric",
    colors: ["Coral"],
    sizes: ["S", "M"],
    rating: 5,
    badge: "New",
    image: IMG.dress07,
    hoverImage: IMG.dress07,
    description:
      "Vibrant coral red 3-piece Pakistani suit with gold embroidery, matching dupatta with gold border, and traditional khussa-ready styling. Available in Small and Medium.",
  },
];

const CATEGORIES = [
  {
    id: "stitched",
    name: "Stitched",
    image: IMG.dress01,
  },
  {
    id: "partywear",
    name: "Party Wear",
    image: IMG.dress04,
  },
  {
    id: "unstitched",
    name: "Unstitched",
    image: IMG.dress03,
  },
  {
    id: "summer",
    name: "Summer",
    image: IMG.dress03,
  },
  {
    id: "winter",
    name: "Winter",
    image: IMG.dress06,
  },
];

function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
