const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = decoded; // Add user info to the request object
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAdmin;
