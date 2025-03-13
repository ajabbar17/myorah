"use client";
import React, { useState } from "react";
import { Package, Calendar, CreditCard, Search, Download, ChevronDown, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminOrdersTable = ({ initialOrders }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredOrders = initialOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      unfulfilled: "bg-amber-50 text-amber-700 border-amber-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      fulfilled: "bg-emerald-50 text-emerald-700 border-emerald-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
      pending: "bg-purple-50 text-purple-700 border-purple-200",
    };
    return statusColors[status?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  console.log(initialOrders);
  return (
    <div className="min-h-screen bg-[#f6f6f7]">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Orders</h1>
            <p className="mt-1 text-sm text-[#637381]">
              Manage and fulfill customer orders
            </p>
          </div>
        
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter orders"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008060]">
                <Filter className="h-4 w-4 mr-2" />
                More filters
              </button>
              <select className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent">
                <option value="">Status</option>
                <option value="unfulfilled">Unfulfilled</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                    className="hover:bg-[#f9fafb] cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#008060]">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#008060]">
                      #{order.orderNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {order.customer.firstName} {order.customer.lastName}
                        </div>
                        <div className="text-gray-500">{order.customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Unfulfilled"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <div className="font-medium text-gray-900">
                        Rs. {order.total.toLocaleString()}
                      </div>
                      <div className="text-gray-500 flex items-center justify-end gap-1.5">
                        <CreditCard className="h-4 w-4" />
                        {order.paymentMethod}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="py-12">
                <div className="text-center">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div>
                {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersTable;