import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      const { token, user } = res.data;

      // Store token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      console.log("✅ Logged in successfully");
      console.log("Role:", user.role);
      console.log("Token:", token);

      // Navigate based on role
      const role = user.role.toLowerCase();
      if (role === "user") {
        navigate("/user/dashboard");
      } else if (role === "seller") {
        navigate("/seller/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>🔐 Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

// Basic styles
const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "2rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
};

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;