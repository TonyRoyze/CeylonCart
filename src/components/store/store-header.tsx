"use client";

import Link from "next/link";
import { Leaf, ShoppingBag } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

export function StoreHeader() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          CeylonCart
        </Link>
        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <ShoppingBag className="size-4" />
            Cart · {itemCount}
          </Link>
        </nav>
      </div>
    </header>
  );
}
