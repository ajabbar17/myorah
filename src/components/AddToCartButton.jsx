// components/AddToCartButton.js
'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();
    const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.category?.toLowerCase() === "ring" ? product.sizes[0] : null
  );

  const handleAddToCart = () => {
    if (product.category?.toLowerCase() === "ring" && !selectedSize) {
      alert("Please select a ring size");
      return;
    }
    addToCart(product, quantity, selectedSize);
    console.log('Added to cart:', product.name,product.image, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    //handleAddToCart();
    // Add navigation to checkout here
     router.push('/cart');
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddToCart}
        className="w-full border border-black py-3 hover:bg-gray-50 transition-colors"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
      >
        Buy it now
      </button>
    </div>
  );
};

export default AddToCartButton;