import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, MoreVertical, Clock, Package, CreditCard } from 'lucide-react';

const OrderDetails = ({ order }) => {


  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatus = () => {
    if (order.paymentMethod === "COD") {
      return {
        label: "Unfulfilled",
        color: "bg-amber-50 text-amber-700 border-amber-200"
      };
    }
    return {
      label: "Paid",
      color: "bg-green-50 text-green-700 border-green-200"
    };
  };

  const status = getOrderStatus();
  //debug statement
  //console.log(order);

  return (
    <div className="min-h-screen bg-[#f6f6f7] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/orders" 
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-medium">Order {order.id}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 bg-white hover:bg-gray-50">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="flex items-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {formatDate(order.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {order.paymentMethod}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
        {/* Left Column - Products */}
        <div className="col-span-2 space-y-6">
          {/* Products Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <h2 className="font-medium">Products</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items?.map((item, index) => (
                <div key={index} className="p-4 flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={item.image } 
                      alt={item.description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.description}
                    </h3>
                    <p className="text-sm text-gray-500">{item.quantity} × Rs{item.discountedPrice}</p>
                  </div>
                  <div className="text-sm text-gray-900">
                    Rs {item.discountedPrice * item.quantity}
                  </div>
                </div>
              ))}
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>Rs{order.total - order.shipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>Rs{order.shipping}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>Rs{order.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <h2 className="font-medium">Timeline</h2>
            </div>
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Order placed</p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Shipping */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <h2 className="font-medium">Customer</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {order.customer?.firstName} {order.customer?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{order.customer?.email}</p>
                  <p className="text-sm text-gray-500">{order.customer?.phone}</p>
                </div>
                {/* {order.customer?.orders && (
                  <div className="text-sm text-gray-500">
                    {order.customer.orders} orders
                  </div>
                )} */}
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <h2 className="font-medium">Shipping Address</h2>
            </div>
            <div className="p-4">
              <address className="text-sm text-gray-500 not-italic">
                {order.customer?.address}<br />
                {order.customer?.city}<br />
                Postal Code: {order.customer?.postalCode}<br />
                {order.customer?.country}
              </address>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <h2 className="font-medium">Payment</h2>
            </div>
            <div className="p-4">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                {status.label}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;