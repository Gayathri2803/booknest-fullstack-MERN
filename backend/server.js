import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/config.js"; // ✅

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB(); // ✅

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});