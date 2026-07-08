"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: {
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
    avgRating?: number;
    reviewCount?: number;
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const images: string[] = JSON.parse(product.images);
  const price = parseFloat(product.price);
  const compareAt = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: images[0],
      slug: product.slug,
    });
  };

  const spiceIndicator = (level: number) => {
    return "🌶️".repeat(level);
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
    >
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-spice-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              {product.badge}
            </span>
          )}

          {/* Quick add button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-spice-700 rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-spice-600 hover:text-white"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {product.isVegetarian && (
              <span className="inline-flex items-center text-[11px] font-medium text-curry-700 bg-curry-50 px-1.5 py-0.5 rounded">
                🌿 Veg
              </span>
            )}
            {product.spiceLevel && product.spiceLevel > 0 && (
              <span className="text-xs" title={`Spice Level: ${product.spiceLevel}/5`}>
                {spiceIndicator(Math.min(product.spiceLevel, 5))}
              </span>
            )}
          </div>

          <h3 className="font-serif font-bold text-gray-900 text-base leading-snug group-hover:text-spice-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* Rating */}
          {product.avgRating !== undefined && product.avgRating > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <StarRating rating={product.avgRating} size="sm" />
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price & CTA */}
          <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-spice-700">
                ${price.toFixed(2)}
              </span>
              {compareAt && (
                <span className="text-sm text-gray-400 line-through">
                  ${compareAt.toFixed(2)}
                </span>
              )}
            </div>
            {product.servingSize && (
              <span className="text-xs text-gray-400">
                {product.servingSize}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-spice-600 to-spice-700 text-white py-2.5 rounded-xl font-medium text-sm hover:from-spice-700 hover:to-spice-800 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
