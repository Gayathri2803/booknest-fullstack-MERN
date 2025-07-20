import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  imageUrl: String,
}, {
  timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;