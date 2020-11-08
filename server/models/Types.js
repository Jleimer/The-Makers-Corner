const mongoose = require('mongoose');

const { Schema } = mongoose;

const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Types = mongoose.model('Types', typeSchema);

module.exports = Types;