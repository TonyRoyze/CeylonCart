import { fetchQuery } from "convex/nextjs";

import { api } from "../../../convex/_generated/api";
import { ProductCard } from "@/components/store/product-card";
import { StoreHeader } from "@/components/store/store-header";

export default async function ProductsPage() {
  const products = await fetchQuery(api.products.list);

  return (
    <main className="min-h-screen bg-muted/25">
      <StoreHeader />
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Made locally</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Discover Sri Lankan favourites
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Browse small-batch tea, fragrant spices, thoughtful handicrafts, and
            hand-finished apparel from around the island.
          </p>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Showing {products.length} products
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
