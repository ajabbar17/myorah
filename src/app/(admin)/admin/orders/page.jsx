import AdminOrdersTable from "@/components/admin/Orders";

async function getOrders() {
  const response = await fetch(`http://localhost:3000/api/orders`, {
    next: { revalidate: 300 },
    cache: "force-cache",

  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  
  return response.json();
}

const AdminOrdersPage = async () => {
  const orders = await getOrders();

  return (
    <div>
      <AdminOrdersTable initialOrders={orders} />
    </div>
  );
};

export default AdminOrdersPage;
