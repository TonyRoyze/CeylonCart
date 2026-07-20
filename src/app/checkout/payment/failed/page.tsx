import Link from "next/link";
import { CircleX, RotateCcw } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PaymentFailedPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/40 px-6 py-12">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="items-center">
          <span className="mb-3 grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive">
            <CircleX className="size-7" />
          </span>
          <CardTitle className="text-2xl">Mock payment declined</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <p className="text-sm leading-6 text-muted-foreground">
            No payment was taken and no order was created. Use a test card ending in an even digit to simulate approval.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/checkout/payment" className={cn(buttonVariants())}>
              <RotateCcw className="size-4" />
              Try again
            </Link>
            <Button variant="outline" render={<Link href="/" />}>
              Return to store
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
