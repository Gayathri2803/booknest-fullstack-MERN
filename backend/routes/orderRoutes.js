import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController.js";

import { protect, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Create new order (User/Seller)
router.post("/create", protect, createOrder);

// 📌 Get orders for logged-in user (User/Seller)
router.get("/myorders", protect, getUserOrders);

// 📌 Get all orders (Admin only)
router.get("/admin", protect, authorizeAdmin, getAllOrders);

export default router;