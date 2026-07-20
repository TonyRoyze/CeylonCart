import { fetchQuery } from "convex/nextjs";

import { api } from "../../../../convex/_generated/api";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

export default async function OrderConfirmationPage({
  params,
}: PageProps<"/order-confirmation/[orderNumber]">) {
  const { orderNumber } = await params;
  const order = await fetchQuery(api.orders.getByOrderNumber, { orderNumber });

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,var(--color-accent),transparent_45%)] px-6 py-12">
      <OrderConfirmation order={order} />
    </main>
  );
}
