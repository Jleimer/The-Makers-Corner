const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }
  ],
  bluePrints: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Blueprint'
      }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
