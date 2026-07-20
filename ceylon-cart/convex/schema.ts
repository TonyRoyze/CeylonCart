import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    priceInCents: v.number(),
    category: v.union(
      v.literal("tea"),
      v.literal("spices"),
      v.literal("handicrafts"),
      v.literal("apparel"),
    ),
    imageUrl: v.string(),
    featured: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  orders: defineTable({
    orderNumber: v.string(),
    customer: v.object({
      name: v.string(),
      address: v.string(),
      phone: v.string(),
      email: v.string(),
    }),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        quantity: v.number(),
        unitPriceInCents: v.number(),
      }),
    ),
    totalInCents: v.number(),
    paymentStatus: v.union(v.literal("succeeded"), v.literal("failed")),
  }).index("by_order_number", ["orderNumber"]),
});
