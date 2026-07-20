"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/components/providers/cart-provider";
import { ProductArtwork } from "@/components/store/product-artwork";
import { StoreHeader } from "@/components/store/store-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatLkr } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, itemCount, totalInCents, removeItem, updateQuantity } = useCart();

  return (
    <main className="min-h-screen bg-muted/25">
      <StoreHeader />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Your selection</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Shopping cart</h1>
          <p className="mt-2 text-muted-foreground">
            {itemCount === 1 ? "1 item" : `${itemCount} items`} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="mx-auto max-w-xl text-center">
            <CardContent className="grid justify-items-center gap-5 py-12">
              <span className="grid size-16 place-items-center rounded-full bg-muted text-muted-foreground">
                <ShoppingBag className="size-7" />
              </span>
              <div>
                <h2 className="text-xl font-semibold">Your cart is empty</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore the catalogue and add a locally made favourite.
                </p>
              </div>
              <Link href="/products" className={cn(buttonVariants())}>
                Browse products
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
            <Card>
              <CardContent className="divide-y p-0">
                {items.map((item) => (
                  <article key={item.productId} className="grid gap-4 p-5 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                    <Link href={`/products/${item.slug}`}>
                      <ProductArtwork
                        category={item.category}
                        name={item.name}
                        className="rounded-xl"
                      />
                    </Link>
                    <div>
                      <Link href={`/products/${item.slug}`} className="font-semibold hover:text-primary">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm capitalize text-muted-foreground">
                        {item.category}
                      </p>
                      <p className="mt-2 text-sm font-medium">
                        {formatLkr(item.unitPriceInCents)} each
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                      <p className="font-semibold">
                        {formatLkr(item.unitPriceInCents * item.quantity)}
                      </p>
                      <div className="mt-3 flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="size-3.5" />
                        </Button>
                        <span className="w-9 text-center text-sm" aria-label={`${item.quantity} in cart`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="ml-2 text-destructive"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order total</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatLkr(totalInCents)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatLkr(totalInCents)}</span>
                </div>
                <Link href="/checkout" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                  Continue to checkout
                </Link>
                <Link href="/products" className="text-center text-sm text-muted-foreground hover:text-foreground">
                  Continue shopping
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </main>
  );
}
