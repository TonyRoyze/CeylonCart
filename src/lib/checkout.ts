import type { Id } from "../../convex/_generated/dataModel";

export type CheckoutDraftItem = {
  productId?: Id<"products">;
  name: string;
  quantity: number;
  unitPriceInCents: number;
};

export type CheckoutDraft = {
  customer: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  items: CheckoutDraftItem[];
};

const STORAGE_KEY = "ceylon-cart.checkout-draft.v1";

export const demoCheckoutDraft: CheckoutDraft = {
  customer: {
    name: "Nimali Perera",
    address: "42 Galle Road, Colombo 03",
    phone: "+94 77 123 4567",
    email: "nimali@example.com",
  },
  items: [
    { name: "Uva Highlands Tea", quantity: 1, unitPriceInCents: 185000 },
    { name: "Ceylon Cinnamon", quantity: 1, unitPriceInCents: 125000 },
  ],
};

export function saveCheckoutDraft(draft: CheckoutDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function readCheckoutDraft(): CheckoutDraft {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return demoCheckoutDraft;

  try {
    const draft = JSON.parse(raw) as CheckoutDraft;
    if (
      !draft.customer?.name ||
      !draft.customer.address ||
      !draft.customer.phone ||
      !draft.customer.email ||
      !Array.isArray(draft.items) ||
      draft.items.length === 0
    ) {
      return demoCheckoutDraft;
    }
    return draft;
  } catch {
    return demoCheckoutDraft;
  }
}

export function clearCheckoutDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function checkoutTotal(draft: CheckoutDraft) {
  return draft.items.reduce(
    (total, item) => total + item.unitPriceInCents * item.quantity,
    0,
  );
}

export function formatLkr(amountInCents: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
  }).format(amountInCents / 100);
}
