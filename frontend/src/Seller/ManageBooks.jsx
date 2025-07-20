import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./BookForm";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/books/seller", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      alert("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  return (
    <div>
      <h2>📚 Your Books</h2>
      <button onClick={() => { setEditingBook(null); setShowForm(true); }}>
        ➕ Add New Book
      </button>

      {showForm && (
        <BookForm
          book={editingBook}
          onSave={() => { setShowForm(false); fetchBooks(); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> — ₹{book.price}
            <button onClick={() => handleEdit(book)}>✏️ Edit</button>
            <button onClick={() => handleDelete(book._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooks;