"use client";
import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cities } from "@/utils/city";
import { saveOrderToFirestore } from "@/lib/firebaseService";
import OrderSuccessModal from "./Modal";
import { useRouter } from "next/navigation";

const Checkout = () => {
  // Form states
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    country: "Pakistan",
    newsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Cart data
  const { items = [], totalAmount = 0, clearCart } = useCart() || {};
  const shipping = 250;
  const total = totalAmount + shipping;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // City search filter
  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Select city
  const handleCitySelect = (city) => {
    setFormData((prev) => ({ ...prev, city }));
    setShowDropdown(false);
    setSearchQuery("");
    if (errors.city) {
      setErrors((prev) => ({ ...prev, city: "" }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/"); // Redirect to home page after closing modal
  };

  // Handle form submission
  const handleCheckout = async () => {
    if (validateForm()) {
      const orderData = {
        customer: formData,
        items,
        totalAmount,
        shipping,
        total,
        paymentMethod,
        billingSameAsShipping,
        createdAt: new Date(),
        status: "pending",
      };

      try {
        await saveOrderToFirestore(orderData);
        clearCart();
        setIsModalOpen(true);
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          postalCode: "",
          phone: "",
          country: "Pakistan",
          newsletter: false,
        });
      } catch (error) {
        console.error("Checkout error:", error);
        alert("There was an error processing your order. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        {/* Contact Section */}
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`w-full p-2 border rounded mb-1 ${errors.email ? "border-red-500" : ""}`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-4">{errors.email}</p>
        )}

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="newsletter">Email me with news and offers</label>
        </div>

        {/* Delivery Section */}
        <div className="relative mb-4">
          <div
            className={`w-full p-2 border rounded flex justify-between items-center cursor-pointer ${
              errors.city ? "border-red-500" : ""
            }`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{formData.city || "Select city from dropdown"}</span>
            <ChevronDown />
          </div>
          {showDropdown && (
            <div className="absolute w-full mt-1 bg-white border rounded shadow-lg z-10">
              <div className="p-2 border-b sticky top-0 bg-white">
                <div className="flex items-center gap-2 bg-gray-50 rounded px-2">
                  <Search size={20} className="text-gray-400" />
                  <input type="text" onClick={(e) => e.stopPropagation()} />
                </div>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCitySelect(city)}
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
          {errors.city && (
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
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className={`w-full p-2 border rounded mb-1 ${errors.firstName ? "border-red-500" : ""}`}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className={`w-full p-2 border rounded mb-1 ${errors.lastName ? "border-red-500" : ""}`}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className={`w-full p-2 border rounded mb-1 ${errors.address ? "border-red-500" : ""}`}
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mb-4">{errors.address}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            className={`w-full p-2 border rounded mb-4 ${errors.city ? "border-red-500" : ""}`}
            disabled
            value={formData.city}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal code (optional)"
            className="w-full p-2 border rounded mb-4"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className={`w-full p-2 border rounded mb-1 ${errors.phone ? "border-red-500" : ""}`}
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mb-4">{errors.phone}</p>
        )}
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
      <OrderSuccessModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Checkout;
