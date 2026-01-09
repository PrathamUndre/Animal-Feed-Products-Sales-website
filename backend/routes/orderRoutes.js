const express = require('express');
const Order = require("../models/Order");
const verifyAdmin = require("../middleware/verifyAdmin"); // Import the admin verification middleware
const router = express.Router();

// Dummy order route
router.post('/', (req, res) => {
  const { productId, quantity, totalPrice, address, phone, paymentMethod } = req.body;

  // Here you would handle the order logic, e.g., saving to the database
  res.status(201).json({
    message: 'Order placed successfully!',
    order: { productId, quantity, totalPrice, address, phone, paymentMethod },
  });
});

// Get all orders (only for admin)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
