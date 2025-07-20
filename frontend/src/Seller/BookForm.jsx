import React, { useState, useEffect } from "react";
import axios from "axios";

const BookForm = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (book?._id) {
        await axios.put(`http://localhost:5000/api/books/${book._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/books", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSave();
    } catch (err) {
      alert("Failed to save book");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{book ? "Edit Book" : "Add Book"}</h2>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default BookForm;