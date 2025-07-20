// 📁 backend/routes/bookRoutes.js
import express from "express";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import {
  protect,
  authorizeAdminOrSeller,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public - Get All Books
router.get("/", getBooks);

// ✅ Public - Get Book By ID
router.get("/:id", getBookById);

// ✅ Admin/Seller - Add Book
router.post("/", protect, authorizeAdminOrSeller, addBook);

// ✅ Admin/Seller - Update Book
router.put("/:id", protect, authorizeAdminOrSeller, updateBook);

// ✅ Admin/Seller - Delete Book
router.delete("/:id", protect, authorizeAdminOrSeller, deleteBook);

export default router;