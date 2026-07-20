"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

import type { Id } from "../../../convex/_generated/dataModel";

export type CartItem = {
  productId: Id<"products">;
  slug: string;
  name: string;
  category: "tea" | "spices" | "handicrafts" | "apparel";
  unitPriceInCents: number;
  quantity: number;
};

type AddableProduct = Omit<CartItem, "quantity">;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalInCents: number;
  addItem: (product: AddableProduct) => void;
  removeItem: (productId: Id<"products">) => void;
  updateQuantity: (productId: Id<"products">, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "ceylon-cart.cart.v1";
const EMPTY_CART: CartItem[] = [];
const listeners = new Set<() => void>();
let cachedRaw = "[]";
let cachedCart = EMPTY_CART;

function parseCart(raw: string): CartItem[] {
  try {
    const value = JSON.parse(raw) as CartItem[];
    return Array.isArray(value) ? value : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function getCartSnapshot() {
  const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedCart = parseCart(raw);
  }
  return cachedCart;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function writeCart(items: CartItem[]) {
  cachedCart = items;
  cachedRaw = JSON.stringify(items);
  localStorage.setItem(STORAGE_KEY, cachedRaw);
  listeners.forEach((listener) => listener());
}

function addItem(product: AddableProduct) {
  const items = getCartSnapshot();
  const existing = items.find((item) => item.productId === product.productId);
  writeCart(
    existing
      ? items.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...items, { ...product, quantity: 1 }],
  );
}

function removeItem(productId: Id<"products">) {
  writeCart(getCartSnapshot().filter((item) => item.productId !== productId));
}

function updateQuantity(productId: Id<"products">, quantity: number) {
  if (quantity < 1) return removeItem(productId);
  writeCart(
    getCartSnapshot().map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(99, Math.floor(quantity)) }
        : item,
    ),
  );
}

function clearCart() {
  writeCart([]);
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getCartSnapshot, () => EMPTY_CART);
  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      totalInCents: items.reduce(
        (total, item) => total + item.unitPriceInCents * item.quantity,
        0,
      ),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within CartProvider");
  return cart;
}
