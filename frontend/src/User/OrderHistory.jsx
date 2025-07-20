import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2>📜 My Bookings</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1.5rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <ul>
              {order.books.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.book?.title || "Book deleted"}</strong> — ₹{item.price} × {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.books.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;