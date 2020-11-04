const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
  price: {
    type: Number,
    required: true,
    min: 0.99,
    trim: true
  },
  courseTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  difficulty: {
      type: String,
      required: true,
  },
  items: {
      type: String,
      required: true,
      trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;