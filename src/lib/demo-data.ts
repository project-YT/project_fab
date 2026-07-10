import type { Product, Category, Banner } from "./types";

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

export const demoCategories: Category[] = [
  { id: "dresses", name: "Dresses", slug: "dresses", image: img("photo-1595777457583-95e059d581b8") },
  { id: "tops", name: "Tops & Blouses", slug: "tops", image: img("photo-1618354691373-d851c5c3a990") },
  { id: "bottoms", name: "Bottoms", slug: "bottoms", image: img("photo-1584370848010-d7fe6bc767ec") },
  { id: "outerwear", name: "Outerwear", slug: "outerwear", image: img("photo-1591047139829-d91aecb6caea") },
  { id: "accessories", name: "Accessories", slug: "accessories", image: img("photo-1523381210434-271e8be1f52b") },
  { id: "footwear", name: "Footwear", slug: "footwear", image: img("photo-1543163521-1bf539c55dd2") },
];

function p(
  id: string,
  name: string,
  price: number,
  compareAtPrice: number | undefined,
  category: string,
  images: string[],
  opts: Partial<Product> = {},
): Product {
  return {
    id,
    name,
    slug: id,
    description:
      "A refined everyday essential, crafted from breathable premium fabric with a modern silhouette. Effortless from morning to evening.",
    price,
    compareAtPrice,
    categoryId: category,
    categoryName: demoCategories.find((c) => c.id === category)?.name,
    brandName: opts.brandName ?? "Aurelle Atelier",
    images: images.map((u) => ({ url: img(u), public_id: u })),
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blush", "Sky", "Ivory"],
    stock: 24,
    featured: opts.featured,
    newArrival: opts.newArrival,
  };
}

export const demoProducts: Product[] = [
  p("linen-slip-dress", "Linen Slip Dress", 2499, 3299, "dresses", ["photo-1595777457583-95e059d581b8", "photo-1596993100471-c3905dafa78e"], { featured: true, newArrival: true }),
  p("silk-camisole", "Silk Camisole", 1899, undefined, "tops", ["photo-1618354691373-d851c5c3a990"], { newArrival: true }),
  p("wide-leg-trousers", "Wide-Leg Trousers", 2799, 3499, "bottoms", ["photo-1584370848010-d7fe6bc767ec"], { featured: true }),
  p("cropped-blazer", "Cropped Blazer", 3999, undefined, "outerwear", ["photo-1591047139829-d91aecb6caea"], { featured: true, newArrival: true }),
  p("pleated-midi-skirt", "Pleated Midi Skirt", 2199, undefined, "bottoms", ["photo-1583496661160-fb5886a13d44"]),
  p("cashmere-cardigan", "Cashmere Cardigan", 4599, 5499, "outerwear", ["photo-1608234808654-2a8875faa7fd"], { featured: true }),
  p("floral-maxi-dress", "Floral Maxi Dress", 3299, undefined, "dresses", ["photo-1572804013309-59a88b7e92f1"], { newArrival: true }),
  p("gold-hoop-earrings", "Gold Hoop Earrings", 899, 1299, "accessories", ["photo-1535632066927-ab7c9ab60908"]),
  p("suede-loafers", "Suede Loafers", 3499, undefined, "footwear", ["photo-1543163521-1bf539c55dd2"]),
  p("straw-tote-bag", "Straw Tote Bag", 1699, undefined, "accessories", ["photo-1584917865442-de89df76afd3"]),
  p("ribbed-knit-top", "Ribbed Knit Top", 1399, undefined, "tops", ["photo-1503342217505-b0a15ec3261c"]),
  p("wrap-mini-dress", "Wrap Mini Dress", 2699, 3199, "dresses", ["photo-1566174053879-31528523f8ae"], { featured: true }),
];

export const demoBanners: Banner[] = [
  {
    id: "hero-1",
    title: "Softly Spoken",
    subtitle: "The Spring Edit — sky-lit hues, breathable weaves",
    image: img("photo-1487222477894-8943e31ef7b2"),
    cta: "Shop the edit",
    link: "/shop",
    active: true,
    order: 1,
  },
];