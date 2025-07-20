// 📁 backend/controllers/bookController.js
import Book from "../models/Book.js";

// ✅ Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Get Books Error:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// ✅ Get single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error("Get Book By ID Error:", err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

// ✅ Add new book (Admin/Seller)
export const addBook = async (req, res) => {
  const { title, author, description, price, quantity } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      description,
      price,
      quantity,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Add Book Error:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
};

// ✅ Update book (Admin/Seller)
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
};

// ✅ Delete book (Admin/Seller)
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Delete Book Error:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
};