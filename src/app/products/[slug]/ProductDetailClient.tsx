"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";

interface ProductData {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription: string | null;
  price: string;
  compareAtPrice: string | null;
  images: string;
  badge: string | null;
  spiceLevel: number | null;
  isVegetarian: boolean | null;
  servingSize: string | null;
  featured: boolean | null;
  inStock: boolean | null;
  createdAt: Date;
  categoryId: number | null;
}

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
}

interface ReviewData {
  id: number;
  productId: number;
  author: string;
  rating: number;
  title: string | null;
  comment: string | null;
  verified: boolean | null;
  createdAt: Date;
}

interface RelatedProduct {
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

export default function ProductDetailClient({
  product,
  category,
  reviews,
  avgRating,
  totalReviews,
  relatedProducts,
}: {
  product: ProductData;
  category: CategoryData | null;
  reviews: ReviewData[];
  avgRating: number;
  totalReviews: number;
  relatedProducts: RelatedProduct[];
}) {
  const { addItem } = useCart();
  const images: string[] = JSON.parse(product.images);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({
    author: "",
    rating: 5,
    title: "",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [localReviews, setLocalReviews] = useState(reviews);

  const price = parseFloat(product.price);
  const compareAt = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price,
        image: images[0],
        slug: product.slug,
      },
      quantity
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          ...reviewForm,
        }),
      });
      if (res.ok) {
        const newReview = await res.json();
        setLocalReviews([newReview, ...localReviews]);
        setReviewForm({ author: "", rating: 5, title: "", comment: "" });
        setSubmitMessage("Thank you for your review! 🎉");
        setTimeout(() => setSubmitMessage(""), 3000);
      }
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const spiceIndicator = (level: number) => "🌶️".repeat(level);

  // Rating distribution
  const ratingDist = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: localReviews.filter((rev) => rev.rating === r).length,
    pct:
      localReviews.length > 0
        ? (localReviews.filter((rev) => rev.rating === r).length /
            localReviews.length) *
          100
        : 0,
  }));

  return (
    <div className="pt-20 sm:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-spice-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-spice-600 transition-colors"
            >
              Menu
            </Link>
            {category && (
              <>
                <span>/</span>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="hover:text-spice-600 transition-colors"
                >
                  {category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image gallery */}
            <div className="space-y-4 animate-fade-in-up">
              {/* Main image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-spice-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {product.badge}
                  </span>
                )}
                {compareAt && (
                  <span className="absolute top-4 right-4 bg-curry-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Save ${(compareAt - price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
                        i === selectedImage
                          ? "ring-2 ring-spice-500 ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - Image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
            >
              {/* Category & badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {category && (
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-sm text-spice-600 font-medium hover:text-spice-700 transition-colors"
                  >
                    {category.name}
                  </Link>
                )}
                {product.isVegetarian && (
                  <span className="inline-flex items-center text-xs font-medium text-curry-700 bg-curry-50 px-2 py-0.5 rounded-full">
                    🌿 Vegetarian
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {totalReviews > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <StarRating rating={avgRating} size="md" showValue />
                  <span className="text-sm text-gray-500">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-spice-700">
                  ${price.toFixed(2)}
                </span>
                {compareAt && (
                  <span className="text-lg text-gray-400 line-through">
                    ${compareAt.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-5 text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>

              {/* Meta */}
              <div className="mt-6 flex flex-wrap gap-4">
                {product.servingSize && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-2.5">
                    <span>📦</span>
                    <span>{product.servingSize}</span>
                  </div>
                )}
                {product.spiceLevel !== null && product.spiceLevel > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-2.5">
                    <span>
                      {spiceIndicator(Math.min(product.spiceLevel, 5))}
                    </span>
                    <span>Spice Level {product.spiceLevel}/5</span>
                  </div>
                )}
              </div>

              {/* Add to cart */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-spice-600 to-spice-700 text-white py-3.5 rounded-xl font-semibold text-lg hover:from-spice-700 hover:to-spice-800 transition-all duration-200 hover:shadow-lg hover:shadow-spice-200 active:scale-[0.98]"
                >
                  Add to Cart — ${(price * quantity).toFixed(2)}
                </button>
              </div>

              {/* Free delivery note */}
              <p className="mt-4 text-sm text-gray-500 flex items-center gap-1.5">
                <span>🚚</span> Free delivery on orders over $30
              </p>

              {/* Long description */}
              {product.longDescription && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                    About This Dish
                  </h3>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {product.longDescription
                      .split("\n\n")
                      .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews section */}
      <section className="bg-stone-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Rating summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-900">
                    {avgRating > 0 ? avgRating.toFixed(1) : "—"}
                  </div>
                  <div className="mt-2">
                    <StarRating rating={avgRating} size="lg" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Based on {totalReviews}{" "}
                    {totalReviews === 1 ? "review" : "reviews"}
                  </p>
                </div>

                {/* Distribution */}
                <div className="space-y-2">
                  {ratingDist.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-4">
                        {r.stars}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-saffron-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-saffron-400 rounded-full transition-all duration-500"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-6 text-right">
                        {r.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Write review form */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Write a Review
                  </h3>
                  <form onSubmit={handleSubmitReview} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={reviewForm.author}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, author: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setReviewForm({ ...reviewForm, rating: star })
                            }
                            className="p-0.5"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className={`w-5 h-5 transition-colors ${
                                star <= reviewForm.rating
                                  ? "text-saffron-400"
                                  : "text-gray-300"
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Review title"
                      value={reviewForm.title}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Your review..."
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          comment: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-spice-400 focus:border-transparent resize-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-spice-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-spice-700 transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                    {submitMessage && (
                      <p className="text-sm text-curry-600 text-center">
                        {submitMessage}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="lg:col-span-2 space-y-4">
              {localReviews.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                  <span className="text-4xl block mb-3">💬</span>
                  <h3 className="font-serif font-bold text-gray-900 text-lg">
                    No reviews yet
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                localReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-spice-400 to-saffron-400 flex items-center justify-center text-white text-sm font-bold">
                            {review.author[0]}
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 text-sm">
                              {review.author}
                            </span>
                            {review.verified && (
                              <span className="ml-2 text-xs text-curry-600 font-medium">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-1.5">
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && (
                      <h4 className="font-semibold text-gray-900 mt-3">
                        {review.title}
                      </h4>
                    )}
                    {review.comment && (
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
