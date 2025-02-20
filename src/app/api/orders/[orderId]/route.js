// app/api/orders/[orderId]/route.js
import { NextResponse } from "next/server";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";
export const revalidate = 300;

// Fix: Change the parameter structure
export async function GET(request, { params }) {
  const { orderId } = await params;  // Remove await, params is not a promise

  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderData = {
      id: orderSnap.id,
      ...orderSnap.data(),
      createdAt: orderSnap.data().createdAt?.toDate().toISOString(),
      updatedAt: orderSnap.data().updatedAt?.toDate().toISOString(),
    };

    return NextResponse.json(orderData);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}