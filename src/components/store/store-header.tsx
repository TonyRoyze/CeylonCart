"use client";

import Link from "next/link";
import { Leaf, LogIn, ShieldCheck, ShoppingBag, UserRound } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

export function StoreHeader() {
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
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
            <span className="hidden sm:inline">Shop</span>
            <span className="sm:hidden">Browse</span>
          </Link>
          {user?.role === "admin" ? (
            <Link href="/admin" aria-label="Admin orders" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex")}>
              <ShieldCheck className="size-4" /> Admin
            </Link>
          ) : null}
          <Link
            href="/account"
            aria-label={user ? `Account for ${user.name}` : "Sign in"}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-2 sm:px-2.5")}
          >
            {user ? <UserRound className="size-4" /> : <LogIn className="size-4" />}
            <span className="hidden sm:inline">{user ? user.name.split(" ")[0] : "Sign in"}</span>
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
