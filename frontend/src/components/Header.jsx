import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <h2 style={{ display: "inline", marginRight: "2rem" }}>📚 BookNest</h2>
      <Link to="/register" style={{ color: "#61dafb", marginRight: "1rem" }}>Register</Link>
      <Link to="/login" style={{ color: "#61dafb" }}>Login</Link>
    </nav>
  );
};

export default Header;