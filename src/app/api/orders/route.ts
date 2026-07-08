import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      postalCode,
      notes,
      items,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !address ||
      !city ||
      !postalCode ||
      !items?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const deliveryFee = subtotal >= 30 ? 0 : 4.99;
    const total = subtotal + deliveryFee;

    const [order] = await db
      .insert(orders)
      .values({
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        address,
        city,
        postalCode,
        subtotal: subtotal.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        total: total.toFixed(2),
        notes: notes || null,
      })
      .returning();

    const orderItemsData = items.map(
      (item: {
        productId: number;
        productName: string;
        quantity: number;
        price: number;
      }) => ({
        orderId: order.id,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price.toFixed(2),
      })
    );

    await db.insert(orderItems).values(orderItemsData);

    return NextResponse.json({
      orderId: order.id,
      total: total.toFixed(2),
      status: order.status,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
