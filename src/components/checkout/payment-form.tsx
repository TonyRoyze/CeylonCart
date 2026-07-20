"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  checkoutTotal,
  clearCheckoutDraft,
  demoCheckoutDraft,
  formatLkr,
  readCheckoutDraft,
} from "@/lib/checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
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

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function subscribeToBrowserReady() {
  return () => undefined;
}

export function PaymentForm() {
  const router = useRouter();
  const { clearCart } = useCart();
  const isBrowserReady = useSyncExternalStore(
    subscribeToBrowserReady,
    () => true,
    () => false,
  );
  const draft = isBrowserReady ? readCheckoutDraft() : demoCheckoutDraft;
  const [cardholder, setCardholder] = useState("Nimali Perera");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/30");
  const [cvc, setCvc] = useState("123");
  const [error, setError] = useState<string>();
  const [isPaying, setIsPaying] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    const cardDigits = digitsOnly(cardNumber);
    if (!cardholder.trim()) return setError("Enter the name shown on the card.");
    if (cardDigits.length !== 16) return setError("Enter a 16-digit test card number.");
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return setError("Use MM/YY for the expiry date.");
    if (!/^\d{3,4}$/.test(cvc)) return setError("Enter a 3 or 4-digit security code.");

    setIsPaying(true);
    try {
      const response = await fetch("/api/mock-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: draft.customer,
          items: draft.items,
          cardLastFour: cardDigits.slice(-4),
        }),
      });
      const result = (await response.json()) as
        | { success: true; orderNumber: string }
        | { success: false; code: string };

      if (!response.ok) throw new Error("Invalid mock payment request");

      if (!result.success) {
        router.push("/checkout/payment/failed");
        return;
      }

      clearCheckoutDraft();
      clearCart();
      router.push(`/order-confirmation/${encodeURIComponent(result.orderNumber)}`);
    } catch {
      setError("The mock gateway could not process this payment. Please try again.");
      setIsPaying(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
      <Card>
        <CardHeader>
          <div className="mb-2 flex items-center justify-between gap-4">
            <Badge variant="secondary">Mock gateway</Badge>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <LockKeyhole className="size-3.5" />
              No real payment is taken
            </span>
          </div>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CreditCard className="size-6 text-primary" />
            Payment details
          </CardTitle>
          <CardDescription>
            For the demo, a card ending in an even digit succeeds; an odd digit fails.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="cardholder">Name on card</Label>
              <Input
                id="cardholder"
                value={cardholder}
                onChange={(event) => setCardholder(event.target.value)}
                autoComplete="cc-name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-number">Test card number</Label>
              <Input
                id="card-number"
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) => {
                  const digits = digitsOnly(event.target.value).slice(0, 16);
                  setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
                }}
                autoComplete="cc-number"
                aria-describedby="card-hint"
              />
              <p id="card-hint" className="text-xs text-muted-foreground">
                Try 4242 4242 4242 4242 for success or 4000 0000 0000 0001 for failure.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value.slice(0, 5))}
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">Security code</Label>
                <Input
                  id="cvc"
                  inputMode="numeric"
                  value={cvc}
                  onChange={(event) => setCvc(digitsOnly(event.target.value).slice(0, 4))}
                  autoComplete="cc-csc"
                />
              </div>
            </div>
            {error ? (
              <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </CardContent>
          <CardFooter className="mt-6 border-t pt-6">
            <Button className="w-full" size="lg" type="submit" disabled={isPaying}>
              {isPaying ? "Processing mock payment…" : `Pay ${formatLkr(checkoutTotal(draft))}`}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="bg-muted/35">
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
          <CardDescription>{draft.customer.name}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {draft.items.map((item, index) => (
            <div key={`${item.productId ?? item.name}-${index}`} className="flex gap-4 text-sm">
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{item.name}</span>
                <span className="text-muted-foreground">Qty {item.quantity}</span>
              </span>
              <span>{formatLkr(item.unitPriceInCents * item.quantity)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{formatLkr(checkoutTotal(draft))}</span>
          </div>
          <p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            This is an assignment simulation. Card details are never stored.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
