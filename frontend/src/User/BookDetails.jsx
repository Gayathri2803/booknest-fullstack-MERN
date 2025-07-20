import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setMessage("Failed to load book details.");
      }
    };
    fetchBook();
  }, [id]);

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        { bookId: book._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Order placed successfully!");
    } catch (err) {
      setMessage("Order failed.");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ₹{book.price}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <button onClick={handlePurchase}>Buy Now</button>
      <button onClick={() => addToCart(book)}>🛒 Add to Cart</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookDetails;