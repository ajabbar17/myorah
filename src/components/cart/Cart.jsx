"use client";
import { Trash } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const Cart = () => {
  const {
    items = [],
    totalAmount = 0,
    updateQuantity,
    removeFromCart,
  } = useCart() || {};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">SHOPPING CART</h2>

      {!items || items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/shop"
            className="text-black underline hover:text-gray-600"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id+item.selectedSize} className="border-b pb-4 mb-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="flex gap-4 items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">
                      PKR {item.discountedPrice.toLocaleString()}
                    </p>
                    {item.selectedSize && (
                      <p className="text-gray-500">Size: {item.selectedSize}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity - 1,
                        item.selectedSize
                      )
                    }
                    className="px-2 py-1 border rounded"
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity + 1,
                        item.selectedSize
                      )
                    }
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id, item.selectedSize)}
                  >
                    <Trash className="text-gray-600 cursor-pointer" />
                  </button>
                </div>

                <p className="text-lg font-semibold text-right">
                  PKR {(item.discountedPrice * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">
              Subtotal: PKR {totalAmount.toLocaleString()}
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Taxes and shipping calculated at checkout
          </p>

          <div className="mt-4">
            <Link href="/checkout">
            <button className="w-full bg-black text-white py-3 font-bold">
              CHECKOUT
            </button>
            </Link>
            <Link href="/shop">
              <button className="w-full border py-3 mt-2 font-bold">
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
