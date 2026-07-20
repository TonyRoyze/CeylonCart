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

The product images referenced by the seed are placeholders for the catalogue implementation phase.
