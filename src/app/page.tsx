import { db } from "@/db";
import { products, reviews, categories } from "@/db/schema";
import { eq, sql, avg, count } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

// Temporary setup logic to ensure Neon has your tables built automatically
async function buildDatabaseTables() {
  try {
    // 1. Create Categories Table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        image TEXT
      );
    `);

    // 2. Create Products Table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        price NUMERIC NOT NULL,
        compare_at_price NUMERIC,
        images TEXT[],
        badge TEXT,
        spice_level INTEGER DEFAULT 0,
        is_vegetarian BOOLEAN DEFAULT false,
        serving_size TEXT,
        featured BOOLEAN DEFAULT false
      );
    `);

    // 3. Create Reviews Table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Database tables built successfully!");
  } catch (err) {
    console.error("Database initialization notice:", err);
  }
}

export default async function HomePage() {
  // Trigger table setup on runtime execution
  await buildDatabaseTables();

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
