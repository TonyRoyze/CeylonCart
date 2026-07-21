# CeylonCart

CeylonCart is a coursework e-commerce MVP for locally made Sri Lankan products.
It includes a searchable catalogue, persistent cart, simulated checkout, dummy
accounts, and a basic order administration view.

## Technology

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS and shadcn/ui
- Convex functions and database

## Requirements

- Node.js 20 or later
- npm
- A Convex account and development deployment

## Local setup

Install the dependencies:

```bash
npm install
```

Connect the project to Convex and push the functions and schema:

```bash
npx convex dev --once
```

Convex creates `.env.local` with values similar to:

```dotenv
CONVEX_DEPLOYMENT=dev:your-development-name
NEXT_PUBLIC_CONVEX_URL=https://your-development-name.convex.cloud
```

Seed the product catalogue:

```bash
npx convex run seed:productsSeed
```

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For continuous Convex function updates during development, run this in a second
terminal and leave it running:

```bash
npm run dev:backend
```

## Available scripts

```text
npm run dev          Start the Next.js development server
npm run dev:backend  Watch and deploy Convex development changes
npm run build        Create a production Next.js build
npm run start        Start the production Next.js server
npm run lint         Run ESLint
```

## Features and routes

- `/` — responsive landing page and featured products
- `/products` — product catalogue with search and category filters
- `/products/[slug]` — product details and add-to-cart action
- `/cart` — persistent browser cart with quantity and removal controls
- `/checkout` — customer and delivery details
- `/checkout/payment` — deterministic simulated payment
- `/order-confirmation/[orderNumber]` — persisted order confirmation
- `/account` — local-only dummy registration and sign-in
- `/admin` — admin-only view of the latest 100 orders

Product photography is loaded from `public/images`, including
`public/images/images.jpg` for the handwoven reed basket and homepage artwork.

## Demo accounts and payment

The administrator account is:

```text
Email: admin@ceyloncart.lk
Password: admin123
```

New customer accounts are stored in the browser's local storage. This is a demo
authentication flow and must not be treated as production authentication.

The payment form does not process real money:

- `4242 4242 4242 4242` succeeds and creates an order.
- `4000 0000 0000 0001` opens the payment-failed page.
- Only the final four digits are submitted to the mock handler.
- Card details are not stored.
- Product names and prices are checked against Convex before order creation.

## Deploying to Vercel with the development database

This project intentionally connects the Vercel frontend to the existing Convex
development deployment. Vercel builds Next.js but does not deploy Convex, so no
Convex deploy key is required.

### 1. Prepare the development backend

Push the current Convex functions and schema:

```bash
npx convex dev --once
```

Seed it if the catalogue is empty:

```bash
npx convex run seed:productsSeed
```

Copy `NEXT_PUBLIC_CONVEX_URL` from `.env.local`. Do not copy
`CONVEX_DEPLOYMENT`.

### 2. Create the Vercel project

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Keep the framework preset set to **Next.js**.
4. Keep the root directory set to the repository root.
5. Use `npm install` as the install command.
6. Use `npm run build` as the build command. This is already set in
   `vercel.json`.
7. Leave the output directory unset so Vercel uses the Next.js default.

### 3. Configure the Vercel environment

Create this environment variable before the first deployment:

```text
Name: NEXT_PUBLIC_CONVEX_URL
Value: https://your-development-name.convex.cloud
Environments: Production, Preview, Development
```

Do not add these variables to Vercel:

```text
CONVEX_DEPLOYMENT
CONVEX_DEPLOY_KEY
NEXT_PUBLIC_CONVEX_SITE_URL
```

Deploy the project after saving the environment variable. If the variable is
added or changed after a build, redeploy so Next.js receives the new value.

## Updating the deployed application

Frontend-only changes are deployed by pushing the repository normally.

When code under `convex/` changes, update the shared development backend before
pushing the frontend:

```bash
npx convex dev --once
git push
```

All Vercel production and preview deployments configured with the same URL read
and write the same development database. This is suitable for coursework and
demonstrations, but not for a real production store.
