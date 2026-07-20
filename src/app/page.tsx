import { fetchQuery } from "convex/nextjs";
import { ArrowRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

import { api } from "../../convex/_generated/api";
import { ProductCard } from "@/components/store/product-card";
import { StoreHeader } from "@/components/store/store-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const storeBenefits = [
  { label: "Made in Sri Lanka", icon: PackageCheck },
  { label: "Island-wide delivery", icon: Truck },
  { label: "Secure demo checkout", icon: ShieldCheck },
];

export default async function Home() {
  const products = await fetchQuery(api.products.list);
  const featuredProducts = products.filter((product) => product.featured);
  const visibleProducts = featuredProducts.length > 0 ? featuredProducts : products;

  return (
    <main className="min-h-screen bg-muted/25">
      <StoreHeader />

      <section className="border-b bg-[radial-gradient(circle_at_top_left,var(--color-accent),transparent_45%)]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <Badge variant="secondary">Ceylon favourites, locally made</Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Bring a little piece of Sri Lanka home.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Shop small-batch tea, fragrant spices, hand-finished crafts, and
            apparel from makers around the island.
          </p>
          <Link
            href="#products"
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            Shop featured products
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-5 sm:grid-cols-3">
          {storeBenefits.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Featured collection</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start with an island favourite
            </h2>
          </div>
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            View all products
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
