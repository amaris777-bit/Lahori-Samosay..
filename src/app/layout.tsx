import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import CartProvider from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lahori Samosay — Authentic Lahori Food Delivered",
  description:
    "Handcrafted samosas, biryanis, curries, kebabs and more. Authentic Lahori street food made with love, delivered fresh to your door.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-stone-50 text-gray-900 antialiased"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
