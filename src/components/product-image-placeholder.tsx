import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductImagePlaceholderProps = {
  name: string;
  category: string;
  tone: string;
  className?: string;
};

export function ProductImagePlaceholder({
  name,
  category,
  tone,
  className,
}: ProductImagePlaceholderProps) {
  return (
    <div
      aria-label={`${name} product image placeholder`}
      role="img"
      className={cn(
        "relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br",
        tone,
        className
      )}
    >
      <div className="absolute inset-x-8 top-8 h-16 rounded-full bg-white/35 blur-xl" />
      <div className="relative grid size-20 place-items-center rounded-full border border-white/70 bg-white/55 shadow-sm">
        <ImageIcon className="size-8 text-primary" />
      </div>
      <span className="absolute bottom-4 left-4 rounded-md bg-background/85 px-2 py-1 text-xs font-medium text-foreground shadow-sm">
        {category}
      </span>
    </div>
  );
}
