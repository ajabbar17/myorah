"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.category?.toLowerCase() === "ring" ? product.sizes?.[0] : null
  );

  // Quantity handlers
  const handleQuantityChange = (newValue) => {
    const validQuantity = Math.max(1, Math.min(99, newValue));
    setQuantity(validQuantity);
  };

  // Add to cart handlers
  const handleAddToCart = () => {
    if (product.category?.toLowerCase() === "ring" && !selectedSize) {
      alert("Please select a ring size");
      return;
    }
    addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    //handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="container mx-auto px-16 py-8">
      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Left: Product Image */}
        <div className="">
          <div className="relative aspect-square max-w-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 max-w-[500px]">
            <button className="border p-2">
              <img
                src={product.image}
                alt="Thumbnail"
                className="w-full aspect-square object-contain"
              />
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col max-w-md">
          <h1 className="text-4xl font-medium mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-gray-500 line-through">
              Rs.{product.actualPrice.toLocaleString()} PKR
            </p>
            <p className="text-xl">
              Rs.{product.discountedPrice.toLocaleString()} PKR
            </p>
          </div>

          {/* Integrated Size Selector */}
          {product.category?.toLowerCase() === "ring" && product.sizes && (
            <div className="mb-8">
              <p className="text-gray-700 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 border rounded-full flex items-center justify-center transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-6">
            Shipping calculated at checkout.
          </p>

          {/* Integrated Quantity Selector */}
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
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                className="w-auto text-center"
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

          <p className="text-gray-600 mb-8">
            <span className="font-bold">Description: </span>
            {product.description}
          </p>

          {/* Integrated Add to Cart Buttons */}
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
