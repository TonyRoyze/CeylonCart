import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CeylonCart | Made in Sri Lanka",
  description: "A simple storefront for locally made Sri Lankan products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>
          <CartProvider>{children}</CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
