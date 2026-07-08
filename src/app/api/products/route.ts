import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, reviews, categories } from "@/db/schema";
import { eq, sql, avg, count, ilike, and, type SQL } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const vegetarian = searchParams.get("vegetarian");
  const sort = searchParams.get("sort") || "featured";

  const conditions: SQL[] = [];

  if (category) {
    const cat = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, category))
      .limit(1);
    if (cat.length > 0) {
      conditions.push(eq(products.categoryId, cat[0].id));
    }
  }

  if (search) {
    conditions.push(
      sql`(${ilike(products.name, `%${search}%`)} OR ${ilike(
        products.description,
        `%${search}%`
      )})`
    );
  }

  if (vegetarian === "true") {
    conditions.push(eq(products.isVegetarian, true));
  }

  let orderClause: SQL;
  switch (sort) {
    case "price-asc":
      orderClause = sql`${products.price}::numeric ASC`;
      break;
    case "price-desc":
      orderClause = sql`${products.price}::numeric DESC`;
      break;
    case "rating":
      orderClause = sql`avg(${reviews.rating}) DESC NULLS LAST`;
      break;
    case "name":
      orderClause = sql`${products.name} ASC`;
      break;
    default:
      orderClause = sql`${products.featured} DESC, ${products.id} ASC`;
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const result = await db
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
      featured: products.featured,
      avgRating: avg(reviews.rating),
      reviewCount: count(reviews.id),
    })
    .from(products)
    .leftJoin(reviews, eq(products.id, reviews.productId))
    .where(where)
    .groupBy(products.id)
    .orderBy(orderClause);

  const formatted = result.map((p) => ({
    ...p,
    price: p.price.toString(),
    compareAtPrice: p.compareAtPrice?.toString() ?? null,
    avgRating: p.avgRating ? parseFloat(p.avgRating) : 0,
    reviewCount: Number(p.reviewCount),
  }));

  return NextResponse.json(formatted);
}
