const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  blueprints: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Blueprint'
      }
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
