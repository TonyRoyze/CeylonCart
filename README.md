# CeylonCart

Foundation for the IS4105 / CS4127 AI-assisted e-commerce MVP assignment.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- Convex backend and database

## Local development

Run the backend to start the configured local Convex deployment:

```bash
npm run dev:backend
```

Keep it running, then in another terminal seed the starter catalogue and run Next.js:

```bash
npx convex run seed:productsSeed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Product imagery is deliberately represented by responsive category artwork placeholders for the MVP.

## Implemented MVP flow

- `/products` — catalogue of 10 seeded products with image placeholders, prices, and categories.
- `/products/[slug]` — product description, price, and add-to-cart action.
- `/cart` — persistent cart with remove, quantity, and running-total controls.
- `/checkout` — customer name, address, phone, and email form.
- `/checkout/payment` — deterministic simulated payment gateway.
- `/order-confirmation/[orderNumber]` — persisted order summary and generated order ID.

## Checkout integration contract

FR5 and FR6 live at `/checkout/payment` and `/order-confirmation/[orderNumber]`.
The payment route requires a checkout draft created from a non-empty cart. Opening it
directly sends the customer back to the cart instead of creating a placeholder order.

When the checkout form is ready, pass its data to the payment module before navigating:

```tsx
import { saveCheckoutDraft } from "@/lib/checkout";

saveCheckoutDraft({
  customer: { name, address, phone, email },
  items: cartItems.map((item) => ({
    productId: item.productId,
    name: item.name,
    quantity: item.quantity,
    unitPriceInCents: item.unitPriceInCents,
  })),
});
router.push("/checkout/payment");
```

The mock gateway is deterministic:

- A 16-digit card ending in an even digit succeeds and creates a Convex order.
- A 16-digit card ending in an odd digit opens the failure result without creating an order.
- Only the final four digits are sent to the mock mutation; card details are not stored.
- Product names and prices are checked against Convex before an order is created, so
  browser-edited totals are rejected.
