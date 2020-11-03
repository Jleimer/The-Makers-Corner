const mongoose = require("mongoose");

const { Schema } = mongoose;

const blueprintSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
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
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

const Blueprint = mongoose.model("Blueprint", blueprintSchema);

module.exports = Blueprint;
