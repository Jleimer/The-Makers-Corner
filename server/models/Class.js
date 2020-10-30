const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
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
  price: {
    type: Number,
    required: true,
    min: 0.99,
    trim: true
  },
  classTime: {
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
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;