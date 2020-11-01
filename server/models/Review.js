const mongoose = require("mongoose");
const moment = require("moment");

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
