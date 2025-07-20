import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;