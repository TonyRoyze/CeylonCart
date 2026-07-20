import Link from "next/link";
import { ArrowRight, Leaf, MapPin, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const foundations = [
  {
    title: "Product catalogue",
    description: "A Convex product model ready for tea, spices, crafts, and apparel.",
    icon: Leaf,
  },
  {
    title: "Shopping journey",
    description: "App Router foundations for catalogue, cart, checkout, and confirmation.",
    icon: ShoppingBag,
  },
  {
    title: "Local-first backend",
    description: "Convex runs locally now and can move to a hosted deployment later.",
    icon: MapPin,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-accent),transparent_38%)]">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            CeylonCart
          </Link>
          <Button variant="outline" size="sm" disabled>
            <ShoppingBag className="size-4" />
            Cart · 0
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-28">
        <div>
          <Badge variant="secondary" className="mb-5">
            AI-assisted MVP foundation
          </Badge>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Local craft, from Sri Lanka to your doorstep.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            The foundation for a small, warm storefront celebrating Ceylon tea,
            spices, handicrafts, and apparel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button disabled>
              Browse products
              <ArrowRight className="size-4" />
            </Button>
            <a
              href="#foundation"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              View foundation
            </a>
          </div>
        </div>

        <Card className="overflow-hidden border-primary/10 bg-card/90 shadow-xl shadow-primary/5">
          <CardHeader className="border-b bg-muted/50">
            <CardDescription>Project status</CardDescription>
            <CardTitle className="text-2xl">Ready for the first feature</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-6">
            {[
              "Next.js App Router",
              "shadcn/ui + Tailwind CSS",
              "Convex schema + local backend",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="size-2 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="foundation" className="border-t bg-background/70">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-medium text-primary">Foundation</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Built around the MVP requirements
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {foundations.map(({ title, description, icon: Icon }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="mb-3 size-6 text-primary" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="leading-6">{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
