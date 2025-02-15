"use client";
import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cities } from "@/utils/city";

const citiesdata = cities;

const Checkout = () => {
  // Form states
  const [selectedCity, setSelectedCity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Payment and billing states
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  // Get cart items and total
  const { items = [], totalAmount = 0 } = useCart() || {};
  const shipping = 250;
  const total = totalAmount + shipping;

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCheckout = () => {
    if (!selectedCity || !email || !phone) {
      setError(true);
      return;
    }
    // Process checkout
    console.log("Processing checkout...");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      {/* Left Section - Checkout Form */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex items-center mb-6">
          <input type="checkbox" id="newsletter" className="mr-2" />
          <label htmlFor="newsletter">Email me with news and offers</label>
        </div>

        <h2 className="text-2xl font-bold mb-4">Delivery</h2>
        {/* Updated City Dropdown */}
        <div className="relative mb-4">
          <div
            className={`w-full p-2 border rounded flex justify-between items-center cursor-pointer ${
              error ? "border-red-500" : ""
            }`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{selectedCity || "Select city from dropdown"}</span>
            <ChevronDown />
          </div>
          {showDropdown && (
            <div className="absolute w-full mt-1 bg-white border rounded shadow-lg z-10">
              <div className="p-2 border-b sticky top-0 bg-white">
                <div className="flex items-center gap-2 bg-gray-50 rounded px-2">
                  <Search size={20} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full p-2 outline-none bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCity(city);
                      setShowDropdown(false);
                      setSearchQuery("");
                      setError(false);
                    }}
                  >
                    {city}
                  </li>
                ))}
                {filteredCities.length === 0 && (
                  <li className="p-2 text-gray-500 text-center">
                    No cities found
                  </li>
                )}
              </ul>
            </div>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-1">
              Please select city from dropdown
            </p>
          )}
        </div>

        {/* Address Fields */}
        <input
          type="text"
          placeholder="Country/Region"
          value="Pakistan"
          disabled
          className="w-full p-2 border rounded mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            className={`w-full p-2 border rounded mb-4 ${error ? "border-red-500" : ""}`}
            disabled
            value={selectedCity}
          />
          <input
            type="text"
            placeholder="Postal code (optional)"
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="border rounded p-4 mb-4">
          <div className="mb-2">
            <input
              type="radio"
              id="cod"
              name="payment"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            <label htmlFor="cod" className="ml-2 font-semibold">
              Cash on Delivery (COD)
            </label>
          </div>
        </div>

        {/* Billing Address Section */}
        <h2 className="text-2xl font-bold mt-6 mb-4">Billing Address</h2>
        <div className="border rounded p-4 mb-6">
          <div className="mb-2">
            <input
              type="radio"
              id="same-address"
              name="billing"
              checked={billingSameAsShipping}
              onChange={() => setBillingSameAsShipping(true)}
            />
            <label htmlFor="same-address" className="ml-2 font-semibold">
              Same as shipping address
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="different-address"
              name="billing"
              checked={!billingSameAsShipping}
              onChange={() => setBillingSameAsShipping(false)}
            />
            <label htmlFor="different-address" className="ml-2 font-semibold">
              Use a different billing address
            </label>
          </div>
          {/* Checkout Button */}
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 mt-4 font-bold"
        >
          COMPLETE ORDER
        </button>
      </div>

      {/* Right Section - Order Summary */}
      <div>
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          {/* Cart Items */}
          {items.map((item) => (
            <div
              key={item._id + (item.selectedSize || "")}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    {item.selectedSize && `Size: ${item.selectedSize} /`} Qty:{" "}
                    {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                Rs {(item.discountedPrice * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          {/* Summary Totals */}
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal:</p>
            <p className="font-semibold">Rs {totalAmount.toLocaleString()}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Shipping:</p>
            <p className="font-semibold">Rs {shipping.toLocaleString()}</p>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg mt-4">
            <p>Total</p>
            <p>Rs {total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
