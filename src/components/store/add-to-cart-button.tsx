"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

import type { Doc } from "../../../convex/_generated/dataModel";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ product }: { product: Doc<"products"> }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto"
      onClick={() => {
        addItem({
          productId: product._id,
          slug: product.slug,
          name: product.name,
          category: product.category,
          unitPriceInCents: product.priceInCents,
        });
        setAdded(true);
      }}
    >
      {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
      {added ? "Added to cart" : "Add to cart"}
    </Button>
  );
}
