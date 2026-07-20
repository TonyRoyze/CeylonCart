import Link from "next/link";

import type { Doc } from "../../../convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatLkr } from "@/lib/checkout";
import { ProductArtwork } from "@/components/store/product-artwork";

export function ProductCard({ product }: { product: Doc<"products"> }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="h-full gap-0 overflow-hidden py-0 transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        <ProductArtwork category={product.category} name={product.name} slug={product.slug} />
        <CardContent className="grid gap-3 p-5">
          <Badge variant="secondary" className="w-fit capitalize">
            {product.category}
          </Badge>
          <div>
            <h2 className="font-semibold tracking-tight group-hover:text-primary">
              {product.name}
            </h2>
            <p className="mt-1 font-medium">{formatLkr(product.priceInCents)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
