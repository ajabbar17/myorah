"use client";
import React from "react";
import { Check } from "lucide-react";

const OrderSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md md:max-w-sm  w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Check className="h-9 w-9 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Order Placed Successfully!
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Thank you for your order. We'll send you a confirmation email with
            your order details.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
