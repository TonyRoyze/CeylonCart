import Link from "next/link";
import { ArrowRight, Leaf, ShoppingBag } from "lucide-react";

import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPrice, products } from "@/lib/products";

export default function Home() {
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

      <section className="border-b bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <Badge variant="secondary" className="mb-4">
            Product catalogue
          </Badge>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Browse Sri Lankan tea, spices, crafts, and apparel.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                A starter catalogue with dummy products, placeholder images, prices,
                and categories for the CeylonCart MVP.
              </p>
            </div>
            <a
              href="#products"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              View products
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">12 products</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Catalogue</h2>
          </div>
          <p className="text-sm text-muted-foreground">Click any item for details.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.slug} className="rounded-lg transition hover:-translate-y-0.5 hover:shadow-md">
              <ProductImagePlaceholder
                name={product.name}
                category={product.category}
                tone={product.imageTone}
                className="rounded-t-lg"
              />
              <CardHeader>
                <Badge variant="outline">{product.category}</Badge>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold">{formatPrice(product.priceInCents)}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(buttonVariants({ variant: "default" }), "w-full")}
                >
                  View details
                  <ArrowRight className="size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
