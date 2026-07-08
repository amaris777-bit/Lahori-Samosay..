import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, author, rating, title, comment } = body;

    if (!productId || !author || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [review] = await db
      .insert(reviews)
      .values({
        productId,
        author,
        rating: Math.min(5, Math.max(1, rating)),
        title: title || null,
        comment: comment || null,
        verified: false,
      })
      .returning();

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
