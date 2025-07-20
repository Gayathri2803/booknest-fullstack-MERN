import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./User/Register";
import Login from "./User/Login";
import UserDashboard from "./User/Dashboard";
import SellerDashboard from "./Seller/Dashboard";
import AdminDashboard from "./Admin/Dashboard";
import BookList from "./User/BookList";
import BookDetails from "./User/BookDetails";
import OrderHistory from "./User/OrderHistory";
import Cart from "./User/Cart";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>🏠 Home</Link>
        <Link to="/books" style={linkStyle}>📚 Browse Books</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/register" style={linkStyle}>📝 Register</Link>
            <Link to="/login" style={linkStyle}>🔐 Login</Link>
          </>
        ) : (
          <>
            {role === "User" && (
              <>
                <Link to="/user/dashboard" style={linkStyle}>👤 Dashboard</Link>
                <Link to="/user/orders" style={linkStyle}>📜 My Orders</Link>
                <Link to="/cart" style={linkStyle}>🛒 Cart</Link>
              </>
            )}
            {role === "Seller" && (
              <Link to="/seller/dashboard" style={linkStyle}>📦 Seller Panel</Link>
            )}
            {role === "Admin" && (
              <Link to="/admin/dashboard" style={linkStyle}>🛠️ Admin Panel</Link>
            )}
            <button onClick={handleLogout} style={logoutStyle}>🚪 Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to BookNest 📚</h1>} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/user/dashboard" element={
          <PrivateRoute allowedRoles={["User"]}>
            <UserDashboard />
          </PrivateRoute>
        } />
        <Route path="/user/orders" element={
          <PrivateRoute allowedRoles={["User"]}>
            <OrderHistory />
          </PrivateRoute>
        } />
        <Route path="/seller/dashboard" element={
          <PrivateRoute allowedRoles={["Seller"]}>
            <SellerDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "1rem",
  backgroundColor: "#333",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

const logoutStyle = {
  ...linkStyle,
  background: "none",
  border: "none",
  cursor: "pointer",
};

export default App;