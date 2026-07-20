import { mutation } from "./_generated/server";

const products = [
  ["Uva Highlands Tea", "uva-highlands-tea", "tea", 1850],
  ["Ceylon Cinnamon", "ceylon-cinnamon", "spices", 1250],
  ["Handwoven Reed Basket", "handwoven-reed-basket", "handicrafts", 4200],
  ["Batik Palm Shirt", "batik-palm-shirt", "apparel", 5600],
  ["Nuwara Eliya Tea", "nuwara-eliya-tea", "tea", 2100],
  ["Roasted Curry Powder", "roasted-curry-powder", "spices", 980],
  ["Painted Wooden Elephant", "painted-wooden-elephant", "handicrafts", 3750],
  ["Handloom Cotton Scarf", "handloom-cotton-scarf", "apparel", 2950],
  ["Jasmine Green Tea", "jasmine-green-tea", "tea", 1950],
  ["Jaffna Curry Blend", "jaffna-curry-blend", "spices", 1100],
] as const;

export const productsSeed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").first();
    if (existing) return { inserted: 0, message: "Products already seeded" };

    for (const [name, slug, category, priceInCents] of products) {
      await ctx.db.insert("products", {
        name,
        slug,
        category,
        priceInCents,
        description: `A locally made ${name.toLowerCase()} selected for CeylonCart.`,
        imageUrl: `/products/${slug}.jpg`,
        featured: [
          "uva-highlands-tea",
          "ceylon-cinnamon",
          "handwoven-reed-basket",
        ].includes(slug),
      });
    }

    return { inserted: products.length, message: "Seed complete" };
  },
});
