"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const QuantitySelector = ({
  productId,
  initialQuantity = 1,
  selectedSize = null,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { updateQuantity } = useCart();

  const handleQuantityChange = (newValue) => {
    const newQuantity = Math.max(1, Math.min(99, newValue));
    setQuantity(newQuantity);

    if (productId) {
      updateQuantity(productId, newQuantity, selectedSize);
    }
  };

  // Update local state if initialQuantity changes (e.g., from cart)
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  return (
    <div className="mb-8">
      <p className="text-gray-700 mb-2">Quantity</p>
      <div className="flex border w-32">
        <button
          className="px-4 py-2 border-r hover:bg-gray-100"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          −
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="w-full text-center"
          min="1"
          max="99"
        />
        <button
          className="px-4 py-2 border-l hover:bg-gray-100"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
