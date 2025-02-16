import AdminOrdersTable from "@/components/admin/Orders";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Server-side data fetching
async function getOrders() {
  const ordersQuery = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );
  
  try {
    const querySnapshot = await getDocs(ordersQuery);
    const ordersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Convert Timestamp to string for serialization
      createdAt: doc.data().createdAt.toDate().toISOString(),
    }));
    return ordersData;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export const revalidate = 60; // Revalidate every 60 seconds

const AdminOrdersPage = async () => {
  const orders = await getOrders();

  return (
    <div>
      <AdminOrdersTable initialOrders={orders} />
    </div>
  );
};

export default AdminOrdersPage;
