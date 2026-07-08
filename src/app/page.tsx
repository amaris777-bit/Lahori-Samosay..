import { db } from "@/db";
import { products, reviews, categories } from "@/db/schema";
import { eq, sql, avg, count } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

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
        "compareAtPrice" NUMERIC,
        images TEXT[],
        badge TEXT,
        "spiceLevel" INTEGER DEFAULT 0,
        "isVegetarian" BOOLEAN DEFAULT false,
        "servingSize" TEXT,
        featured BOOLEAN DEFAULT false
      );
    `);

    // 3. Create Reviews Table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);

    // 4. Seed an initial category using raw SQL to clear type errors
    const categoryCheck = await db.execute(sql`SELECT count(*) FROM categories;`);
    const categoryCount = Number((categoryCheck[0] as any)?.count ?? 0);
    
    if (categoryCount === 0) {
      await db.execute(sql`
        INSERT INTO categories (name, slug, description, image)
        VALUES (
          'Samosas', 
          'samosas', 
          'Freshly baked and fried savory pastries.', 
          'https://images.unsplash.com/photo-1601050690597-df056fb4ce78'
        );
      `);
      console.log("Initial category added successfully!");
    }

    // 5. Seed an initial product using raw SQL to avoid TEXT[] type mismatches
    const productCheck = await db.execute(sql`SELECT count(*) FROM products;`);
    const productCount = Number((productCheck[0] as any)?.count ?? 0);
    
    if (productCount === 0) {
      await db.execute(sql`
        INSERT INTO products (name, slug, description, price, images, badge, "spiceLevel", "isVegetarian", "servingSize", featured)
        VALUES (
          'Classic Potato Samosa',
          'classic-potato-samosa',
          'Crispy pastry filled with perfectly spiced potatoes and peas.',
          5,
          ARRAY['https://images.unsplash.com/photo-1601050690597-df056fb4ce78'],
          'Best Seller',
          2,
          true,
          '2 pieces',
          true
        );
      `);
      console.log("Initial samosa added successfully!");
    }

    console.log("Database tables and seed data completely ready!");
  } catch (err) {
    console.error("Database initialization notice:", err);
  }
}

export default async function HomePage() {
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
