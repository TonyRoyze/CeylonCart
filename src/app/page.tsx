import { fetchQuery } from "convex/nextjs";
import { ArrowRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div>
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
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border-8 border-background shadow-2xl lg:justify-self-end">
            <Image src="/images/images.jpg" alt="Handwoven Sri Lankan reed baskets" width={394} height={507} priority sizes="(max-width: 1024px) 384px, 35vw" className="h-auto w-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-background/90 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-widest text-primary">Crafted by hand</p>
              <p className="mt-1 font-semibold">Natural reed baskets</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-6">
          {storeBenefits.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-6 sm:py-16">
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
