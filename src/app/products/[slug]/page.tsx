import { db } from "@/db";
import { products, reviews, categories } from "@/db/schema";
import { eq, avg, count, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Get product
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) notFound();

  // Get category
  const category = product.categoryId
    ? (await db.select().from(categories).where(eq(categories.id, product.categoryId)).limit(1))[0]
    : null;

  // Get reviews
  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, product.id))
    .orderBy(desc(reviews.createdAt));

  // Get rating stats
  const [ratingStats] = await db
    .select({
      avgRating: avg(reviews.rating),
      totalReviews: count(reviews.id),
    })
    .from(reviews)
    .where(eq(reviews.productId, product.id));

  // Related products
  const relatedProducts = await db
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
      avgRating: avg(reviews.rating),
      reviewCount: count(reviews.id),
    })
    .from(products)
    .leftJoin(reviews, eq(products.id, reviews.productId))
    .where(
      product.categoryId
        ? eq(products.categoryId, product.categoryId)
        : undefined
    )
    .groupBy(products.id)
    .limit(5);

  const related = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      ...p,
      price: p.price.toString(),
      compareAtPrice: p.compareAtPrice?.toString() ?? null,
      avgRating: p.avgRating ? parseFloat(p.avgRating) : 0,
      reviewCount: Number(p.reviewCount),
    }));

  return (
    <ProductDetailClient
      product={{
        ...product,
        price: product.price.toString(),
        compareAtPrice: product.compareAtPrice?.toString() ?? null,
      }}
      category={category}
      reviews={productReviews}
      avgRating={ratingStats.avgRating ? parseFloat(ratingStats.avgRating) : 0}
      totalReviews={Number(ratingStats.totalReviews)}
      relatedProducts={related}
    />
  );
}
