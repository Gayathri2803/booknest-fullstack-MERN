import React from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const books = cartItems.map((item) => ({
        bookId: item._id,
        quantity: item.quantity,
      }));

      const { data } = await axios.post("http://localhost:5000/api/orders", { books }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("❌ Order failed", err);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} style={{ marginBottom: "1rem" }}>
                <strong>{item.title}</strong> - ₹{item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: "1rem" }}>
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button onClick={clearCart}>🧹 Clear Cart</button>
          <button onClick={placeOrder} style={{ marginLeft: "1rem", backgroundColor: "green", color: "#fff" }}>
            ✅ Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;