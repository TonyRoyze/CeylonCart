"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/providers/cart-provider";
import { StoreHeader } from "@/components/store/store-header";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatLkr, saveCheckoutDraft } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalInCents } = useCart();
  const [error, setError] = useState<string>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = {
      name: String(data.get("name") ?? "").trim(),
      address: String(data.get("address") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
    };

    if (Object.values(customer).some((value) => !value)) {
      setError("Complete all customer and delivery fields.");
      return;
    }

    saveCheckoutDraft({
      customer,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPriceInCents: item.unitPriceInCents,
      })),
    });
    router.push("/checkout/payment");
  }

  return (
    <main className="min-h-screen bg-muted/25">
      <StoreHeader />
      <section className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to cart
        </Link>

        {items.length === 0 ? (
          <Card className="mx-auto max-w-lg text-center">
            <CardContent className="grid justify-items-center gap-5 py-12">
              <ShoppingBag className="size-9 text-muted-foreground" />
              <div>
                <h1 className="text-2xl font-semibold">Nothing to check out yet</h1>
                <p className="mt-2 text-sm text-muted-foreground">Add at least one product before checkout.</p>
              </div>
              <Link href="/products" className={cn(buttonVariants())}>Browse products</Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Customer details</CardTitle>
                <CardDescription>Tell us where this demo order should be delivered.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" autoComplete="name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Delivery address</Label>
                    <Textarea id="address" name="address" autoComplete="street-address" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" name="email" type="email" autoComplete="email" required />
                    </div>
                  </div>
                  {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
                </CardContent>
                <CardFooter className="mt-6 border-t pt-6">
                  <Button type="submit" size="lg" className="w-full">
                    Continue to payment <ArrowRight className="size-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>{items.length} product lines</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span>{formatLkr(item.unitPriceInCents * item.quantity)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatLkr(totalInCents)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </main>
  );
}
