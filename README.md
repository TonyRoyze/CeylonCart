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

Product imagery is served responsively from `public/images` with category artwork fallbacks.

## Implemented MVP flow

- `/products` — catalogue of 10 seeded products with image placeholders, prices, and categories.
- `/products/[slug]` — product description, price, and add-to-cart action.
- `/cart` — persistent cart with remove, quantity, and running-total controls.
- `/checkout` — customer name, address, phone, and email form.
- `/checkout/payment` — deterministic simulated payment gateway.
- `/order-confirmation/[orderNumber]` — persisted order summary and generated order ID.
- `/products` also includes live product search and category filters.
- `/account` — local-only demo registration and sign-in (no production authentication).
- `/admin` — admin-gated read-only view of the latest 100 orders.

The demo administrator account is `admin@ceyloncart.lk` with password `admin123`.

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

## Deploying to Vercel with the development database

This demo intentionally points the Vercel frontend at the existing Convex
development deployment. Vercel builds only the Next.js application; it does not
deploy Convex functions and does not require a Convex deploy key.

Before importing the repository into Vercel:

1. Run `npm run dev:backend` locally and leave it running until Convex reports
   that the functions are ready. This pushes the current functions and schema to
   the development deployment.
2. Run `npx convex run seed:productsSeed` if that development deployment does
   not already contain the catalogue.
3. Copy the `NEXT_PUBLIC_CONVEX_URL` value from `.env.local`. It should look like
   `https://your-development-name.convex.cloud`.
4. Import the Git repository as a new Vercel project and keep the detected
   framework preset as **Next.js**.
5. In **Vercel > Project Settings > Environment Variables**, create
   `NEXT_PUBLIC_CONVEX_URL` with the copied development URL. Enable it for
   Production, Preview, and Development if every Vercel environment should share
   the same database.
6. Do not add `CONVEX_DEPLOYMENT`, `CONVEX_DEPLOY_KEY`, or
   `NEXT_PUBLIC_CONVEX_SITE_URL`; this application does not need them on Vercel.
7. Deploy. The build command in `vercel.json` is `npm run build`.

When files under `convex/` change, run `npm run dev:backend` locally again before
deploying the frontend. Vercel will not push those backend changes automatically
in this development-backed setup.

> This configuration is appropriate for a coursework/demo deployment. Every
> Vercel production and preview URL configured this way reads and writes the same
> development database, so it should not be used for a real production store.
