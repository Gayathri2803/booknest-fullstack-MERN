import React from "react";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Welcome to the Seller Dashboard</h2>
      <nav>
        <Link to="/seller/manage-books">Manage Books</Link>
      </nav>
      <p>Manage your listed books, track orders, and view sales analytics.</p>
    </div>
  );
};

export default SellerDashboard;