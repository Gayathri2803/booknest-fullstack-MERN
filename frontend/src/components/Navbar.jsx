import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/user/dashboard">User Dashboard</Link>
      <Link to="/seller/dashboard">Seller Dashboard</Link>
      <Link to="/admin/dashboard">Admin Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/books/:id">Book Details</Link>
    </nav>
  );
};

export default Navbar;