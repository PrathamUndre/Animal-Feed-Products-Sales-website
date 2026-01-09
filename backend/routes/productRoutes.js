// const express = require('express');
// const Product = require('../models/Product');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// // Middleware to verify admin role
// const verifyAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
  
//   if (!token) return res.status(403).json({ message: 'No token provided' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({ message: 'Admin access required' });
//     }

//     next();
//   });
// };

// // Add a new product (only for admin)
// router.post('/', verifyAdmin, async (req, res) => {
//   const { title, description, price, imageUrl, quantity } = req.body;

//   try {
//     const newProduct = new Product({ title, description, price, imageUrl, quantity });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require("express");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../middleware/verifyAdmin"); // Import the admin verification middleware
const router = express.Router();

// Add a new product (only for admin)
router.post("/", verifyAdmin, async (req, res) => {
  const { title, description, price, imageUrl, quantity } = req.body;

  try {
    const newProduct = new Product({ title, description, price, imageUrl, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all products (any user can view products)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
