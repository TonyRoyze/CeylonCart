import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Leaf, ShoppingBag } from "lucide-react";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found | CeylonCart",
    };
  }

  return {
    title: `${product.name} | CeylonCart`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            CeylonCart
          </Link>
          <Button variant="outline" size="sm" disabled>
            <ShoppingBag className="size-4" />
            Cart 0
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:py-16">
        <div className="grid gap-5">
          <Link
            href="/#products"
            className={cn(buttonVariants({ variant: "ghost" }), "w-fit")}
          >
            <ArrowLeft className="size-4" />
            Back to catalogue
          </Link>
          <Card className="rounded-lg p-0">
            <ProductImagePlaceholder
              name={product.name}
              category={product.category}
              tone={product.imageTone}
              className="rounded-lg"
            />
          </Card>
        </div>

        <div className="grid gap-6">
          <div>
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Card className="rounded-lg">
            <CardContent className="grid gap-6 pt-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Price</p>
                <p className="mt-1 text-3xl font-semibold">
                  {formatPrice(product.priceInCents)}
                </p>
              </div>
              <AddToCartButton productName={product.name} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
