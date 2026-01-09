import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Css/Order.css";
import axios from "axios";

function Order() {
  const location = useLocation();
  const { product = "Bronze", price = 1000 } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    product: product,
    quantity: 1,
    paymentMethod: "Cash",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const totalPrice = price * formData.quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative quantity
    if (name === "quantity" && value < 0) return;

    setFormData({ ...formData, [name]: value});
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      setError("All fields are required!");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    setError("");

  try {
    // ✅ Save the order in the backend
    await axios.post("https://animal-feed-products-sales-website.onrender.com", {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      product: formData.product,
      quantity: formData.quantity,
      totalPrice: totalPrice,
      paymentMethod: formData.paymentMethod,
    });

    // ✅ Prepare WhatsApp Message
    const whatsappMessage = `Hello, ${formData.name}!%0A
    Thank you for your order.%0A%0A
    📦 Product: ${formData.product}%0A
    🔢 Quantity: ${formData.quantity}%0A
    💰 Total Price: Rs. ${totalPrice}%0A
    🚚 Delivery Address: ${formData.address}%0A
    💳 Payment Method: ${formData.paymentMethod}%0A%0A
    Your order will be processed soon!`;

    // ✅ Open WhatsApp with pre-filled message
    const whatsappURL = `https://wa.me/${formData.phone}?text=${whatsappMessage}`;
    window.open(whatsappURL, "_blank");

    setMessage("Order placed successfully!");

    // ✅ Reset form after submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        product: product,
        quantity: 1,
        paymentMethod: "Cash",
      });
      setMessage("");
    }, 2000);
  } catch (err) {
    setMessage("Error placing order.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="order-container">
      <h2>Payment Bill Form</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Phone Number:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>

        <label>
          Product:
          <input type="text" name="product" value={formData.product} readOnly />
        </label>

        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} min="1"  onChange={handleChange} required />
        </label>
          <br /><br />
        <label>
          Total Price: Rs. {totalPrice}
        </label>
              <br /><br />
        <label>
          Payment Method:
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="Cash">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
          </select>
        </label>

        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Order;
