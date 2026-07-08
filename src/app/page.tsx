import { db } from "@/db";
import { products, reviews, categories } from "@/db/schema";
import { eq, sql, avg, count } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch featured products with ratings
  const featuredProducts = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      images: products.images,
      badge: products.badge,
      spiceLevel: products.spiceLevel,
      isVegetarian: products.isVegetarian,
      servingSize: products.servingSize,
      avgRating: avg(reviews.rating).as("avg_rating"),
      reviewCount: count(reviews.id).as("review_count"),
    })
    .from(products)
    .leftJoin(reviews, eq(products.id, reviews.productId))
    .where(eq(products.featured, true))
    .groupBy(products.id)
    .orderBy(sql`avg(${reviews.rating}) desc nulls last`)
    .limit(8);

  // Fetch categories
  const allCategories = await db.select().from(categories).orderBy(categories.name);

  const formattedProducts = featuredProducts.map((p) => ({
    ...p,
    price: p.price.toString(),
    compareAtPrice: p.compareAtPrice?.toString() ?? null,
    avgRating: p.avgRating ? parseFloat(p.avgRating) : 0,
    reviewCount: Number(p.reviewCount),
  }));

  return <HomeClient products={formattedProducts} categories={allCategories} />;
}
