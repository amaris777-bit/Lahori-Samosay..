"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  images: string;
  badge: string | null;
  spiceLevel: number | null;
  isVegetarian: boolean | null;
  servingSize: string | null;
  avgRating: number;
  reviewCount: number;
}

export default function HomeClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/31280796/pexels-photo-31280796.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt="Colorful Indian spices"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up">
              <span className="inline-block bg-saffron-500/20 text-saffron-300 text-sm font-medium px-4 py-1.5 rounded-full border border-saffron-500/30 mb-6">
                🔥 Now Delivering in Your Area
              </span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up"
              style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
            >
              The Taste of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 to-spice-400">
                Lahore
              </span>
              <br />
              At Your Door
            </h1>

            <p
              className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
            >
              Handcrafted samosas, aromatic biryanis, sizzling kebabs — authentic
              Lahori street food made with love and generations of tradition.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-spice-600 to-spice-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-spice-700 hover:to-spice-800 transition-all duration-200 hover:shadow-xl hover:shadow-spice-900/30 hover:-translate-y-0.5"
              >
                Order Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                View Menu
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="mt-12 flex flex-wrap items-center gap-6 animate-fade-in-up"
              style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
            >
              {[
                { icon: "⭐", text: "4.9 Rating" },
                { icon: "🚚", text: "Free Delivery $30+" },
                { icon: "🕐", text: "30-Min Delivery" },
                { icon: "🌿", text: "Fresh Daily" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-base">{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-saffron-600 text-sm font-semibold uppercase tracking-wider">
              Explore Our Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Browse by Category
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From crispy samosas to creamy desserts — discover the full range of
              authentic Lahori flavors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] animate-fade-in-up"
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: "backwards",
                }}
              >
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="font-serif font-bold text-white text-base sm:text-lg">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 text-xs mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="text-spice-600 text-sm font-semibold uppercase tracking-wider">
                Our Bestsellers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Featured Dishes
              </h2>
              <p className="text-gray-500 mt-3 max-w-lg">
                The dishes our customers can&apos;t stop ordering. Hand-picked by our
                chef for the ultimate Lahori experience.
              </p>
            </div>
            <Link
              href="/products"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-spice-600 font-medium hover:text-spice-700 transition-colors group"
            >
              View Full Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-saffron-600 text-sm font-semibold uppercase tracking-wider">
              Why Lahori Samosay?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              What Makes Us Special
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "👨‍🍳",
                title: "Family Recipes",
                desc: "Three generations of authentic recipes from the heart of Lahore's food streets.",
              },
              {
                icon: "🌶️",
                title: "Fresh Spices",
                desc: "We grind our spices fresh daily — never pre-packaged. You can taste the difference.",
              },
              {
                icon: "🔥",
                title: "Cooked to Order",
                desc: "Every dish is made fresh when you order. No reheating, no shortcuts, no compromises.",
              },
              {
                icon: "💰",
                title: "Student Friendly",
                desc: "Generous portions at prices that won't break the bank. Feed your cravings, not your debt.",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl hover:bg-saffron-50/50 transition-colors group animate-fade-in-up"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </span>
                <h3 className="font-serif font-bold text-gray-900 text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/36870366/pexels-photo-36870366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt="Spice market"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-spice-900/85" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Hungry? Let&apos;s Fix That.
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Order now and get fresh, authentic Lahori food delivered in 30
            minutes. Free delivery on orders over $30.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 bg-saffron-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-saffron-600 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            🥟 Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}
