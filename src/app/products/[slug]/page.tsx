import { fetchQuery } from "convex/nextjs";
import { ArrowLeft, PackageCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { api } from "../../../../convex/_generated/api";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductArtwork } from "@/components/store/product-artwork";
import { StoreHeader } from "@/components/store/store-header";
import { Badge } from "@/components/ui/badge";
import { formatLkr } from "@/lib/checkout";

export default async function ProductDetailsPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await fetchQuery(api.products.getBySlug, { slug });
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-muted/25">
      <StoreHeader />
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <Link
          href="/products"
          className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to products
        </Link>

        <div className="grid overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-2">
          <ProductArtwork
            category={product.category}
            name={product.name}
            className="aspect-square min-h-80 lg:h-full"
          />
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <Badge variant="secondary" className="mb-4 w-fit capitalize">
              {product.category}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold text-primary">
              {formatLkr(product.priceInCents)}
            </p>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
            <div className="mt-8 grid gap-3 border-t pt-6 text-sm text-muted-foreground sm:grid-cols-2">
              <span className="flex items-center gap-2">
                <PackageCheck className="size-4 text-primary" /> Locally sourced
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> Mock checkout only
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
