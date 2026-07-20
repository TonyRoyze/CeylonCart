"use client";

import { type ReactNode, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!url) {
      throw new Error(
        "NEXT_PUBLIC_CONVEX_URL is missing. Run `npm run dev:backend` to configure Convex.",
      );
    }

    return new ConvexReactClient(url);
  });

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
