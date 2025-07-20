import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  return (
    <div style={containerStyle}>
      {books.map((book) => (
        <div key={book._id} style={cardStyle}>
          <img src={book.image} alt={book.title} style={imageStyle} />
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>
          <Link to={`/books/${book._id}`} style={linkStyle}>📖 View Details</Link>
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
  padding: "2rem",
};

const cardStyle = {
  width: "220px",
  backgroundColor: "#2a2a2a",
  borderRadius: "10px",
  padding: "1rem",
  textAlign: "center",
  color: "#fff",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "1rem",
};

const linkStyle = {
  display: "inline-block",
  marginTop: "0.5rem",
  padding: "0.5rem 1rem",
  backgroundColor: "#444",
  borderRadius: "5px",
  color: "#fff",
  textDecoration: "none",
};

export default BookList;