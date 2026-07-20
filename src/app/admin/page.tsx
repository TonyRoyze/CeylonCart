"use client";

import { useQuery } from "convex/react";
import { ClipboardList, LockKeyhole, PackageCheck } from "lucide-react";
import Link from "next/link";

import { api } from "../../../convex/_generated/api";
import { useAuth } from "@/components/providers/auth-provider";
import { StoreHeader } from "@/components/store/store-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatLkr } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const { user, isReady } = useAuth();
  const orders = useQuery(api.orders.list);

  return (
    <main className="min-h-screen bg-muted/25">
      <StoreHeader />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        {!isReady ? null : user?.role !== "admin" ? (
          <Card className="mx-auto max-w-lg text-center">
            <CardContent className="grid justify-items-center gap-5 py-12">
              <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
                <LockKeyhole className="size-6" />
              </span>
              <div>
                <h1 className="text-2xl font-semibold">Admin access required</h1>
                <p className="mt-2 text-sm text-muted-foreground">Sign in with the demo administrator account to view orders.</p>
              </div>
              <Link href="/account" className={cn(buttonVariants())}>Go to sign in</Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-primary"><ClipboardList className="size-4" /> Admin dashboard</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Recent orders</h1>
                <p className="mt-3 text-muted-foreground">A read-only view of the latest 100 demo orders.</p>
              </div>
              <Badge variant="secondary" className="px-3 py-1.5">
                {orders ? `${orders.length} orders` : "Loading…"}
              </Badge>
            </div>

            {!orders ? (
              <div className="mt-8 grid gap-3">
                {[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-muted" />)}
              </div>
            ) : orders.length === 0 ? (
              <Card className="mt-8">
                <CardContent className="grid justify-items-center gap-3 py-14 text-center">
                  <PackageCheck className="size-8 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">No orders yet</h2>
                  <p className="text-sm text-muted-foreground">Completed checkouts will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="mt-8 grid gap-4">
                {orders.map((order) => (
                  <article key={order._id} className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                    <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold">{order.orderNumber}</h2>
                          <Badge variant="secondary" className="capitalize">{order.paymentStatus}</Badge>
                        </div>
                        <p className="mt-2 text-sm font-medium">{order.customer.name}</p>
                        <p className="truncate text-sm text-muted-foreground">{order.customer.email}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-lg font-semibold text-primary">{formatLkr(order.totalInCents)}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Intl.DateTimeFormat("en-LK", { dateStyle: "medium", timeStyle: "short" }).format(order._creationTime)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                      {order.items.map((item, index) => (
                        <span key={`${item.name}-${index}`} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
