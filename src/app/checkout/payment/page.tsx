import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";

import { PaymentForm } from "@/components/checkout/payment-form";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-accent),transparent_40%)]">
      <header className="border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            CeylonCart
          </Link>
          <span className="text-sm text-muted-foreground">Checkout · Payment</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <Link
          href="/checkout"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to checkout
        </Link>
        <PaymentForm />
      </div>
    </main>
  );
}
