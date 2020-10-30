const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  difficulty: {
      type: String
  },
  items: {
      type: String
  }
});

const Classes = mongoose.model('Classes', classSchema);

module.exports = Classes;