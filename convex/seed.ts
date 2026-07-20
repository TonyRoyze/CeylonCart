import { mutation } from "./_generated/server";

const products = [
  {
    name: "Uva Highlands Tea",
    slug: "uva-highlands-tea",
    category: "tea",
    priceInCents: 185000,
    description:
      "A bright, brisk black tea grown in Sri Lanka's eastern highlands, with a clean finish and gentle floral notes.",
  },
  {
    name: "Ceylon Cinnamon",
    slug: "ceylon-cinnamon",
    category: "spices",
    priceInCents: 125000,
    description:
      "Delicate true cinnamon quills hand-rolled on the southern coast, prized for their warm sweetness and citrus aroma.",
  },
  {
    name: "Handwoven Reed Basket",
    slug: "handwoven-reed-basket",
    category: "handicrafts",
    priceInCents: 420000,
    description:
      "A sturdy storage basket woven by hand from locally harvested reeds, with natural variations that make each piece unique.",
  },
  {
    name: "Batik Palm Shirt",
    slug: "batik-palm-shirt",
    category: "apparel",
    priceInCents: 560000,
    description:
      "A relaxed cotton shirt featuring a hand-dyed palm motif created with traditional Sri Lankan batik techniques.",
  },
  {
    name: "Nuwara Eliya Tea",
    slug: "nuwara-eliya-tea",
    category: "tea",
    priceInCents: 210000,
    description:
      "A fragrant high-grown tea with a pale golden cup and refined bouquet from the cool Nuwara Eliya hills.",
  },
  {
    name: "Roasted Curry Powder",
    slug: "roasted-curry-powder",
    category: "spices",
    priceInCents: 98000,
    description:
      "A deeply aromatic blend of roasted coriander, cumin, fennel, and warming spices for rich Sri Lankan curries.",
  },
  {
    name: "Painted Wooden Elephant",
    slug: "painted-wooden-elephant",
    category: "handicrafts",
    priceInCents: 375000,
    description:
      "A cheerful hand-carved elephant finished with colourful folk-inspired details by local woodcraft artisans.",
  },
  {
    name: "Handloom Cotton Scarf",
    slug: "handloom-cotton-scarf",
    category: "apparel",
    priceInCents: 295000,
    description:
      "A breathable cotton scarf woven on a traditional handloom, finished with soft fringe and subtle island colours.",
  },
  {
    name: "Jasmine Green Tea",
    slug: "jasmine-green-tea",
    category: "tea",
    priceInCents: 195000,
    description:
      "Tender Ceylon green tea scented with jasmine blossoms for a light, soothing cup with a naturally floral aroma.",
  },
  {
    name: "Jaffna Curry Blend",
    slug: "jaffna-curry-blend",
    category: "spices",
    priceInCents: 110000,
    description:
      "A bold northern-style spice blend with chilli, coriander, cumin, and fenugreek for robust seafood and vegetable curries.",
  },
] as const;

export const productsSeed = mutation({
  args: {},
  handler: async (ctx) => {
    let inserted = 0;
    let updated = 0;

    for (const product of products) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", product.slug))
        .unique();
      const data = {
        ...product,
        imageUrl: `/products/${product.slug}.jpg`,
        featured: [
          "uva-highlands-tea",
          "ceylon-cinnamon",
          "handwoven-reed-basket",
        ].includes(product.slug),
      };

      if (existing) {
        await ctx.db.patch(existing._id, data);
        updated += 1;
      } else {
        await ctx.db.insert("products", data);
        inserted += 1;
      }
    }

    return { inserted, updated, total: products.length };
  },
});
