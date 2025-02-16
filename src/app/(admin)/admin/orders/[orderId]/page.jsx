// app/orders/[orderId]/page.jsx
import { getDoc, doc } from 'firebase/firestore';
import OrderDetails from '@/components/admin/OrderDetails';
import { db } from '@/lib/firebase';

export default async function OrderPage({ params }) {
  const { orderId } = await params;
  
  const orderRef = doc(db, 'orders', orderId);
  const orderSnap = await getDoc(orderRef);
  
  if (!orderSnap.exists()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>
        <Link href="/orders" className="mt-4 text-blue-500 hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const orderData = {
    id: orderSnap.id,
    ...orderSnap.data()
  };

  return <OrderDetails order={orderData} />;
}