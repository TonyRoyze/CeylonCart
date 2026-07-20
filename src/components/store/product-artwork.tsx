import { Flame, Leaf, Palette, Shirt } from "lucide-react";

import { cn } from "@/lib/utils";

const categoryStyles = {
  tea: "from-emerald-100 to-lime-50 text-emerald-800 dark:from-emerald-950 dark:to-lime-950 dark:text-emerald-200",
  spices: "from-orange-100 to-amber-50 text-orange-800 dark:from-orange-950 dark:to-amber-950 dark:text-orange-200",
  handicrafts: "from-sky-100 to-cyan-50 text-sky-800 dark:from-sky-950 dark:to-cyan-950 dark:text-sky-200",
  apparel: "from-fuchsia-100 to-rose-50 text-fuchsia-800 dark:from-fuchsia-950 dark:to-rose-950 dark:text-fuchsia-200",
};

const categoryIcons = {
  tea: Leaf,
  spices: Flame,
  handicrafts: Palette,
  apparel: Shirt,
};

export function ProductArtwork({
  category,
  name,
  className,
}: {
  category: keyof typeof categoryStyles;
  name: string;
  className?: string;
}) {
  const Icon = categoryIcons[category];

  return (
    <div
      role="img"
      aria-label={`${name} product placeholder`}
      className={cn(
        "grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br",
        categoryStyles[category],
        className,
      )}
    >
      <div className="grid size-24 place-items-center rounded-full border border-current/10 bg-white/35 shadow-inner backdrop-blur-sm">
        <Icon className="size-11" strokeWidth={1.5} />
      </div>
    </div>
  );
}
