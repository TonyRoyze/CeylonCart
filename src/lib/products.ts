export type Product = {
  name: string;
  slug: string;
  description: string;
  priceInCents: number;
  category: "Tea" | "Spices" | "Handicrafts" | "Apparel";
  imageTone: string;
};

export const products: Product[] = [
  {
    name: "Nuwara Eliya Pekoe",
    slug: "nuwara-eliya-pekoe",
    description:
      "A bright high-grown black tea with a crisp finish, packed for everyday brewing or gifting.",
    priceInCents: 1250,
    category: "Tea",
    imageTone: "from-emerald-200 via-lime-100 to-stone-100",
  },
  {
    name: "Cinnamon Quill Bundle",
    slug: "cinnamon-quill-bundle",
    description:
      "Hand-rolled Ceylon cinnamon quills with a warm, sweet aroma for tea, desserts, and curries.",
    priceInCents: 980,
    category: "Spices",
    imageTone: "from-amber-200 via-orange-100 to-stone-100",
  },
  {
    name: "Woven Palm Basket",
    slug: "woven-palm-basket",
    description:
      "A sturdy woven basket made for market runs, pantry storage, or a natural home accent.",
    priceInCents: 2850,
    category: "Handicrafts",
    imageTone: "from-yellow-200 via-stone-100 to-teal-100",
  },
  {
    name: "Batik Resort Shirt",
    slug: "batik-resort-shirt",
    description:
      "A breathable cotton shirt with a hand-dyed batik pattern inspired by coastal evenings.",
    priceInCents: 4200,
    category: "Apparel",
    imageTone: "from-sky-200 via-cyan-100 to-indigo-100",
  },
  {
    name: "Cardamom Pods",
    slug: "cardamom-pods",
    description:
      "Fragrant green cardamom pods selected for masala chai, rice dishes, and baking.",
    priceInCents: 760,
    category: "Spices",
    imageTone: "from-green-200 via-emerald-100 to-stone-100",
  },
  {
    name: "Coconut Shell Bowl",
    slug: "coconut-shell-bowl",
    description:
      "A polished coconut shell bowl that brings a simple handmade touch to serving snacks.",
    priceInCents: 1500,
    category: "Handicrafts",
    imageTone: "from-stone-300 via-amber-100 to-rose-100",
  },
  {
    name: "Jasmine Green Tea",
    slug: "jasmine-green-tea",
    description:
      "A gentle green tea scented with jasmine for a lighter cup after meals or during study.",
    priceInCents: 1180,
    category: "Tea",
    imageTone: "from-teal-200 via-green-100 to-white",
  },
  {
    name: "Linen Market Tote",
    slug: "linen-market-tote",
    description:
      "A reusable linen tote with reinforced handles and room for books, groceries, or beach things.",
    priceInCents: 2400,
    category: "Apparel",
    imageTone: "from-zinc-200 via-slate-100 to-rose-100",
  },
  {
    name: "Turmeric Root Powder",
    slug: "turmeric-root-powder",
    description:
      "Golden turmeric powder ground for curries, marinades, wellness drinks, and spice blends.",
    priceInCents: 620,
    category: "Spices",
    imageTone: "from-yellow-300 via-amber-100 to-white",
  },
  {
    name: "Hand-Painted Mask",
    slug: "hand-painted-mask",
    description:
      "A decorative wall mask painted in bold traditional colors for a vivid handmade statement.",
    priceInCents: 3600,
    category: "Handicrafts",
    imageTone: "from-red-200 via-blue-100 to-yellow-100",
  },
  {
    name: "Uva Earl Grey",
    slug: "uva-earl-grey",
    description:
      "Ceylon black tea lifted with bergamot for a polished, aromatic afternoon cup.",
    priceInCents: 1320,
    category: "Tea",
    imageTone: "from-violet-200 via-slate-100 to-lime-100",
  },
  {
    name: "Cotton Sarong",
    slug: "cotton-sarong",
    description:
      "A soft cotton sarong with a relaxed drape for beach days, lounging, and travel.",
    priceInCents: 3100,
    category: "Apparel",
    imageTone: "from-pink-200 via-orange-100 to-cyan-100",
  },
];

export function formatPrice(priceInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceInCents / 100);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
