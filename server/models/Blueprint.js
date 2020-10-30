const mongoose = require("mongoose");
const moment = require('moment')

const { Schema } = mongoose;

const ReviewSchema = new Schema({
    reviewId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reviewBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  });

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
  reviews: [ReviewSchema]
});

const Blueprint = mongoose.model("Blueprint", blueprintSchema);

module.exports = Blueprint;
