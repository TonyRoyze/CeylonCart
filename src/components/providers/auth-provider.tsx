"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type User = {
  name: string;
  email: string;
  role: "customer" | "admin";
};

type StoredAccount = User & { password: string };

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
};

const USER_KEY = "ceylon-cart.user.v1";
const ACCOUNTS_KEY = "ceylon-cart.accounts.v1";
const ADMIN_ACCOUNT: StoredAccount = {
  name: "Store Admin",
  email: "admin@ceyloncart.lk",
  password: "admin123",
  role: "admin",
};
const listeners = new Set<() => void>();
let cachedRaw = "";
let cachedUser: User | null = null;

function getUserSnapshot() {
  const raw = localStorage.getItem(USER_KEY) ?? "";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedUser = raw ? (JSON.parse(raw) as User) : null;
    } catch {
      cachedUser = null;
    }
  }
  return cachedUser;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === USER_KEY) listener();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function setUser(user: User | null) {
  cachedUser = user;
  cachedRaw = user ? JSON.stringify(user) : "";
  if (user) localStorage.setItem(USER_KEY, cachedRaw);
  else localStorage.removeItem(USER_KEY);
  listeners.forEach((listener) => listener());
}

function getAccounts(): StoredAccount[] {
  try {
    const stored = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]") as StoredAccount[];
    return [ADMIN_ACCOUNT, ...(Array.isArray(stored) ? stored : [])];
  } catch {
    return [ADMIN_ACCOUNT];
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(subscribe, getUserSnapshot, () => null);
  const isReady = useSyncExternalStore(() => () => undefined, () => true, () => false);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      login(email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        const account = getAccounts().find(
          (candidate) =>
            candidate.email.toLowerCase() === normalizedEmail &&
            candidate.password === password,
        );
        if (!account) return "Email or password is incorrect.";
        const { password: _password, ...safeUser } = account;
        void _password;
        setUser(safeUser);
        return null;
      },
      register(name, email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        if (getAccounts().some((account) => account.email.toLowerCase() === normalizedEmail)) {
          return "An account with this email already exists.";
        }
        const account: StoredAccount = {
          name: name.trim(),
          email: normalizedEmail,
          password,
          role: "customer",
        };
        const current = getAccounts().filter((candidate) => candidate.role !== "admin");
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...current, account]));
        const { password: _password, ...safeUser } = account;
        void _password;
        setUser(safeUser);
        return null;
      },
      logout() {
        setUser(null);
      },
    }),
    [isReady, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used within AuthProvider");
  return auth;
}
