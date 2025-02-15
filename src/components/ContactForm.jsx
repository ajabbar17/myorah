"use client";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "6c254a50-bac3-4c04-acf1-4da0301df007",
          ...formData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Thank you for your message!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          comment: "",
        });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl px-6 md:px-0 mx-auto py-12">
      <h2 className="text-3xl font-semibold mb-6">Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-black w-full px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-black w-full px-3 py-2"
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="border border-black w-full px-3 py-2"
        />
        <textarea
          name="comment"
          placeholder="Comment"
          rows="4"
          value={formData.comment}
          onChange={handleChange}
          className="border border-black w-full px-3 py-2"
        />
        {status && (
          <p
            className={`text-${status.includes("Thank you") ? "green" : "red"}-600`}
          >
            {status}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`bg-black text-white px-6 py-2 mt-4 block w-full transition-opacity ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
