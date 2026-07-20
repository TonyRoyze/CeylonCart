import { fetchMutation } from "convex/nextjs";

import { api } from "../../../../convex/_generated/api";

export async function POST(request: Request) {
  try {
    const paymentRequest = await request.json();
    const result = await fetchMutation(api.orders.place, paymentRequest);
    return Response.json(result);
  } catch {
    return Response.json(
      { success: false, code: "INVALID_PAYMENT_REQUEST" },
      { status: 400 },
    );
  }
}
