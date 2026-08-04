"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Leaf, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { StoreHeader } from "@/components/store/store-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  const router = useRouter();
  const { user, isReady, login, register, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const result =
      mode === "login"
        ? login(email, password)
        : register(String(data.get("name") ?? ""), email, password);
    if (result) {
      setError(result);
      return;
    }
    router.push(email.trim().toLowerCase() === "admin@ceyloncart.lk" ? "/admin" : "/products");
  }

  return (
    <main className="min-h-screen bg-muted/25">
      <StoreHeader />
      <section className="mx-auto max-w-lg px-5 py-10 sm:px-6 sm:py-14">
        {!isReady ? null : user ? (
          <Card>
            <CardHeader className="text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-7" />
              </span>
              <CardTitle className="mt-2 text-2xl">Welcome, {user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {user.role === "admin" ? (
                <Button onClick={() => router.push("/admin")}>
                  <ShieldCheck className="size-4" /> View orders
                </Button>
              ) : (
                <Button onClick={() => router.push("/products")}>Continue shopping</Button>
              )}
              <Button variant="outline" onClick={logout}>
                <LogOut className="size-4" /> Sign out
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <span className="mb-2 grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                {mode === "login" ? <UserRound className="size-5" /> : <Leaf className="size-5" />}
              </span>
              <CardTitle className="text-2xl">
                {mode === "login" ? "Sign in to CeylonCart" : "Create your account"}
              </CardTitle>
              <CardDescription>
                {mode === "login"
                  ? "Use your account to continue shopping."
                  : "Registration is stored locally for this demo."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 rounded-xl bg-muted p-1">
                <Button type="button" variant={mode === "login" ? "default" : "ghost"} onClick={() => { setMode("login"); setError(undefined); }}>
                  Sign in
                </Button>
                <Button type="button" variant={mode === "register" ? "default" : "ghost"} onClick={() => { setMode("register"); setError(undefined); }}>
                  Register
                </Button>
              </div>
              <form className="grid gap-5" onSubmit={handleSubmit}>
                {mode === "register" ? (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" autoComplete="name" required className="h-10" />
                  </div>
                ) : null}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" required className="h-10" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={6} className="h-10" />
                </div>
                {error ? <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
                <Button type="submit" size="lg" className="w-full">
                  {mode === "login" ? "Sign in" : "Create account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
