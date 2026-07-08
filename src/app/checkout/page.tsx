"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"info" | "confirm" | "success">("info");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const deliveryFee = subtotal >= 30 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "info") {
      setStep("confirm");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderId(data.orderId);
        clearCart();
        setStep("success");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Success page
  if (step === "success") {
    return (
      <div className="pt-20 sm:pt-24 min-h-screen flex items-center justify-center bg-stone-50">
        <div className="max-w-md mx-auto text-center p-8 animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-curry-100 flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10 text-curry-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
            Order Placed! 🎉
          </h1>
          <p className="text-gray-500 mb-2">
            Thank you for your order. Your delicious Lahori food is being
            prepared!
          </p>
          {orderId && (
            <p className="text-sm text-gray-400 mb-8">
              Order #{orderId}
            </p>
          )}
          <div className="bg-saffron-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-saffron-800 font-medium">
              🚚 Estimated delivery: 25-35 minutes
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-spice-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-spice-700 transition-colors"
          >
            Order More
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0 && !orderId) {
    return (
      <div className="pt-20 sm:pt-24 min-h-screen flex items-center justify-center bg-stone-50">
        <div className="max-w-md mx-auto text-center p-8">
          <span className="text-6xl block mb-4">🛒</span>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-6">
            Add some delicious items to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-spice-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-spice-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {["Delivery Info", "Review & Pay"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0 && step === "info"
                    ? "bg-spice-600 text-white"
                    : i <= 1 && step === "confirm"
                    ? "bg-spice-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  (i === 0 && step === "info") || step === "confirm"
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
              {i < 1 && (
                <div className="w-12 h-px bg-gray-300 mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === "info" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm animate-fade-in-up">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                    Delivery Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.customerName}
                        onChange={(e) =>
                          updateForm("customerName", e.target.value)
                        }
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.customerEmail}
                        onChange={(e) =>
                          updateForm("customerEmail", e.target.value)
                        }
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.customerPhone}
                        onChange={(e) =>
                          updateForm("customerPhone", e.target.value)
                        }
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                        required
                        placeholder="123 Main Street, Apt 4B"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        required
                        placeholder="Lahore"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) =>
                          updateForm("postalCode", e.target.value)
                        }
                        required
                        placeholder="54000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Special Instructions
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => updateForm("notes", e.target.value)}
                        rows={3}
                        placeholder="Any allergies, delivery instructions, etc."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent resize-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full bg-gradient-to-r from-spice-600 to-spice-700 text-white py-3.5 rounded-xl font-semibold text-base hover:from-spice-700 hover:to-spice-800 transition-all duration-200 hover:shadow-lg"
                  >
                    Continue to Review
                  </button>
                </div>
              )}

              {step === "confirm" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm animate-fade-in-up">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                    Review Your Order
                  </h2>

                  {/* Delivery info summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        Delivering to
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep("info")}
                        className="text-sm text-spice-600 font-medium hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {form.customerName}
                    </p>
                    <p className="text-sm text-gray-600">{form.address}</p>
                    <p className="text-sm text-gray-600">
                      {form.city}, {form.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      {form.customerEmail}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium text-sm text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("info")}
                      className="px-6 py-3.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-spice-600 to-spice-700 text-white py-3.5 rounded-xl font-semibold text-base hover:from-spice-700 hover:to-spice-800 transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                    >
                      {submitting
                        ? "Placing Order..."
                        : `Place Order — $${total.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-curry-600 font-medium">Free</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 30 && (
                <p className="mt-4 text-xs text-saffron-700 bg-saffron-50 rounded-lg px-3 py-2">
                  🚚 Add ${(30 - subtotal).toFixed(2)} more for free delivery!
                </p>
              )}

              <div className="mt-4 bg-curry-50 rounded-lg px-3 py-2">
                <p className="text-xs text-curry-700 font-medium">
                  🕐 Estimated delivery: 25-35 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
