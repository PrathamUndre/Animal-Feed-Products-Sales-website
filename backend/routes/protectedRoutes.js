const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken"); // Import auth middleware

// Protected Route Example
router.get("/protected-route", verifyToken, (req, res) => {
  res.json({ message: "Welcome! You are authenticated.", user: req.user });
});

module.exports = router;
