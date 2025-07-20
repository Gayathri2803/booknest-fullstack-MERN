// backend/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error("Token failed:", error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

// Role-based middleware (optional)
export const authorizeAdminOrSeller = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "seller")) {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Admin access only" });
  }
};