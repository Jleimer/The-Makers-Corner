const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  file: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
  },
  courseTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  items: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
