"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
  productName: string;
};

export function AddToCartButton({ productName }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  return (
    <div className="grid gap-3">
      <Button
        size="lg"
        className="w-full sm:w-fit"
        onClick={() => setAdded(true)}
        aria-label={`Add ${productName} to cart`}
      >
        {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
        {added ? "Added to cart" : "Add to Cart"}
      </Button>
      {added ? (
        <p className="text-sm text-muted-foreground">
          {productName} has been added to your cart.
        </p>
      ) : null}
    </div>
  );
}
