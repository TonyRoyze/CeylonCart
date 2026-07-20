const productImages: Record<string, string> = {
  "uva-highlands-tea": "/images/pekoe.jpg",
  "ceylon-cinnamon": "/images/Premium-Quality-Ceylon-Cinnamon-Quills-8.jpg",
  "handwoven-reed-basket": "/images/images.jpg",
  "batik-palm-shirt": "/images/mens-batik-harbor-shirt-short-sleeve-pink-beach-wedding_600x.jpg.webp",
  "nuwara-eliya-tea": "/images/Sf4decf8d3d674783b75e2f127002c65fm.jpg_720x720q80.jpg",
  "roasted-curry-powder": "/images/turmeric powder.jpg",
  "painted-wooden-elephant": "/images/hand painted mask.jpg",
  "handloom-cotton-scarf": "/images/sarong.jpeg",
  "jasmine-green-tea": "/images/JasmineGreentea.webp",
  "jaffna-curry-blend": "/images/turmeric powder.jpg",
};

export function getProductImage(slug: string) {
  return productImages[slug];
}
