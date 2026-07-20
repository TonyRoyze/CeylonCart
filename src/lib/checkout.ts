import type { Id } from "../../convex/_generated/dataModel";

export type CheckoutDraftItem = {
  productId: Id<"products">;
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

export function saveCheckoutDraft(draft: CheckoutDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function readCheckoutDraft(): CheckoutDraft | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const draft = JSON.parse(raw) as CheckoutDraft;
    if (
      !draft.customer?.name ||
      !draft.customer.address ||
      !draft.customer.phone ||
      !draft.customer.email ||
      !Array.isArray(draft.items) ||
      draft.items.length === 0 ||
      draft.items.some(
        (item) =>
          !item.productId ||
          !item.name ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          !Number.isInteger(item.unitPriceInCents) ||
          item.unitPriceInCents < 0,
      )
    ) {
      return null;
    }
    return draft;
  } catch {
    return null;
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
