"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import type { Doc } from "../../../convex/_generated/dataModel";
import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["all", "tea", "spices", "handicrafts", "apparel"] as const;

export function ProductCatalog({ products }: { products: Doc<"products">[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesSearch =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [category, products, query]);

  return (
    <div className="mt-10">
      <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(16rem,1fr)_auto] lg:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Search products</span>
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tea, spices, crafts…"
              className="h-11 pl-9"
            />
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0" aria-label="Filter by category">
            <SlidersHorizontal className="mr-1 size-4 shrink-0 text-muted-foreground" />
            {categories.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={category === option ? "default" : "outline"}
                onClick={() => setCategory(option)}
                aria-pressed={category === option}
                className="capitalize"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {visibleProducts.length === 1
          ? "Showing 1 product"
          : `Showing ${visibleProducts.length} products`}
      </p>

      {visibleProducts.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
          <p className="font-semibold">No products found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
