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
    image: "images/dresses/dress-01.png",
    hoverImage: "images/dresses/dress-01.png",
    description:
      "Digital printed premium lawn 3-piece suit with lace and pearl embellished neckline, floral placement design, chiffon dupatta, and straight trouser. Available in Small and Medium.",
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
    sizes: ["S", "M"],
    rating: 4.8,
    badge: "New",
    image: "images/dresses/dress-02.png",
    hoverImage: "images/dresses/dress-02.png",
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
    image: "images/dresses/dress-03.png",
    hoverImage: "images/dresses/dress-03.png",
    description:
      "White lawn kameez with rose bouquet prints, soft pink trousers, and a pure white chiffon dupatta. Delicate lace trim and pearl button detailing. Available in Small and Medium.",
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
    sizes: ["S", "M"],
    rating: 4.8,
    badge: "Bestseller",
    image: "images/dresses/dress-04.png",
    hoverImage: "images/dresses/dress-04.png",
    description:
      "Vibrant royal blue 3-piece suit with intricate silver embroidery, off-white chiffon dupatta, and straight trousers. A statement piece for festive occasions. Available in Small and Medium.",
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
    sizes: ["S", "M"],
    rating: 4.7,
    badge: null,
    image: "images/dresses/dress-05.png",
    hoverImage: "images/dresses/dress-05.png",
    description:
      "Soft peach 3-piece suit with fine silver-white embroidery, sheer dupatta, and straight-cut trousers. Elegant and refined for formal gatherings. Available in Small and Medium.",
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
    sizes: ["S", "M"],
    rating: 4.8,
    badge: null,
    image: "images/dresses/dress-06.png",
    hoverImage: "images/dresses/dress-06.png",
    description:
      "Sophisticated grey-lilac 3-piece suit with multi-toned floral embroidery, sheer dupatta, and embroidered trouser borders. Available in Small and Medium.",
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
    sizes: ["S", "M"],
    rating: 5,
    badge: "New",
    image: "images/dresses/dress-07.png",
    hoverImage: "images/dresses/dress-07.png",
    description:
      "Vibrant coral red 3-piece Pakistani suit with gold embroidery, matching dupatta with gold border, and traditional khussa-ready styling. Available in Small and Medium.",
  },
];

const CATEGORIES = [
  {
    id: "stitched",
    name: "Stitched",
    image: "images/dresses/dress-04.png",
  },
  {
    id: "unstitched",
    name: "Unstitched",
    image: "images/dresses/dress-01.png",
  },
  {
    id: "summer",
    name: "Summer",
    image: "images/dresses/dress-03.png",
  },
  {
    id: "winter",
    name: "Winter",
    image: "images/dresses/dress-06.png",
  },
];

function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
