import Order from "../models/Order.js";
import Book from "../models/Book.js";

// ✅ Create a new order
export const createOrder = async (req, res) => {
  try {
    const { books } = req.body;
    const orderBooks = [];

    for (let item of books) {
      const book = await Book.findById(item.bookId);
      if (!book || book.quantity < item.quantity) {
        return res.status(400).json({ error: `Book not available: ${item.bookId}` });
      }

      book.quantity -= item.quantity;
      await book.save();

      orderBooks.push({
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      });
    }

    const order = new Order({
      user: req.user.userId,
      books: orderBooks,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// ✅ Get all orders placed by the current user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("books.book", "title author");
    res.status(200).json(orders);
  } catch (err) {
    console.error("User Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

// ✅ Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("books.book", "title author")
      .populate("user", "name email");
    res.status(200).json(orders);
  } catch (err) {
    console.error("All Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};