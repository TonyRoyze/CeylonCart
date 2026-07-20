import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const customer = v.object({
  name: v.string(),
  address: v.string(),
  phone: v.string(),
  email: v.string(),
});

const orderItem = v.object({
  productId: v.optional(v.id("products")),
  name: v.string(),
  quantity: v.number(),
  unitPriceInCents: v.number(),
});

export const place = mutation({
  args: {
    customer,
    items: v.array(orderItem),
    cardLastFour: v.string(),
  },
  handler: async (ctx, args) => {
    const lastDigit = Number(args.cardLastFour.at(-1));

    // Deterministic mock gateway: even final digit succeeds, odd final digit fails.
    if (!/^\d{4}$/.test(args.cardLastFour) || lastDigit % 2 !== 0) {
      return { success: false as const, code: "MOCK_CARD_DECLINED" };
    }

    if (args.items.length === 0) {
      throw new Error("An order must contain at least one item.");
    }

    const hasInvalidItem = args.items.some(
      (item) =>
        !item.name.trim() ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        !Number.isInteger(item.unitPriceInCents) ||
        item.unitPriceInCents < 0,
    );
    if (hasInvalidItem) throw new Error("The order contains an invalid item.");

    const hasInvalidCustomer = Object.values(args.customer).some(
      (value) => !value.trim(),
    );
    if (hasInvalidCustomer) throw new Error("Customer details are incomplete.");

    const totalInCents = args.items.reduce(
      (total, item) => total + item.unitPriceInCents * item.quantity,
      0,
    );
    const now = Date.now();
    const orderNumber = `CC-${now.toString(36).toUpperCase()}`;

    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      customer: args.customer,
      items: args.items,
      totalInCents,
      paymentStatus: "succeeded",
    });

    return { success: true as const, orderId, orderNumber };
  },
});

export const getByOrderNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, { orderNumber }) =>
    ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) => q.eq("orderNumber", orderNumber))
      .unique(),
});
