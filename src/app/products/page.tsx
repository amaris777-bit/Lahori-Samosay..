import { db } from "@/db";
import { categories } from "@/db/schema";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(categories.name);

  return <ProductsClient categories={allCategories} />;
}
