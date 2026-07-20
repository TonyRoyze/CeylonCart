import Link from "next/link";
import { CheckCircle2, MapPin, PackageCheck } from "lucide-react";

import type { Doc } from "../../../convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatLkr } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export function OrderConfirmation({ order }: { order: Doc<"orders"> | null }) {
  if (order === null) {
    return (
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle>Order not found</CardTitle>
          <CardDescription>
            Check the confirmation link or return to the store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" className={cn(buttonVariants())}>
            Return to store
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl overflow-hidden">
      <CardHeader className="items-center border-b bg-emerald-50 text-center dark:bg-emerald-950/25">
        <span className="mb-3 grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
          <CheckCircle2 className="size-9" />
        </span>
        <Badge className="bg-emerald-700 text-white hover:bg-emerald-700">Payment successful</Badge>
        <CardTitle className="mt-2 text-3xl">Thank you for your order</CardTitle>
        <CardDescription>
          Your order ID is <strong className="text-foreground">{order.orderNumber}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 pt-6">
        <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
          <PackageCheck className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="font-medium">Order confirmed</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Placed on {new Intl.DateTimeFormat("en-LK", { dateStyle: "medium", timeStyle: "short" }).format(order._creationTime)}
            </p>
          </div>
        </div>

        <section aria-labelledby="items-heading">
          <h2 id="items-heading" className="mb-4 font-semibold">Order summary</h2>
          <div className="grid gap-4">
            {order.items.map((item, index) => (
              <div key={`${item.productId ?? item.name}-${index}`} className="flex gap-4 text-sm">
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-muted-foreground">Qty {item.quantity}</span>
                </span>
                <span>{formatLkr(item.unitPriceInCents * item.quantity)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total paid</span>
            <span>{formatLkr(order.totalInCents)}</span>
          </div>
        </section>

        <section aria-labelledby="delivery-heading" className="flex items-start gap-3 rounded-xl border p-4">
          <MapPin className="mt-0.5 size-5 text-primary" />
          <div>
            <h2 id="delivery-heading" className="font-medium">Delivery details</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {order.customer.name}<br />
              {order.customer.address}<br />
              {order.customer.phone} · {order.customer.email}
            </p>
          </div>
        </section>

        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
          Continue shopping
        </Link>
      </CardContent>
    </Card>
  );
}
