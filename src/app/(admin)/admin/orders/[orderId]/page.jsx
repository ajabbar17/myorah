// app/orders/[orderId]/page.jsx
import Link from "next/link";
import OrderDetails from "@/components/admin/OrderDetails";

async function getOrder(orderId) {
  console.log("fetching order", orderId);
  const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch order");
  }

  return response.json();
}

export default async function OrderPage({ params }) {
  const { orderId } = await params;
  const orderData = await getOrder(orderId.toString());

  if (!orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>
        <Link href="/orders" className="mt-4 text-blue-500 hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return <OrderDetails order={orderData} />;
}
