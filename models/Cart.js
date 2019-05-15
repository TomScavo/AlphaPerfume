const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  items: [
    {
      perfume: {
        type: Schema.Types.ObjectId,
        ref: 'perfummes'
      },
      handle: {
        type: String,
        isrequired: true
      },
      name: {
        type: String,
        isrequired: true
      },
      format: {
        ml: {
          type: String,
          isrequired: true
        },
        price: {
          type: Number,
          isrequired: true
        },
        amount: {
          type: Number,
          idrequired: true
        }
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model('carts', cartSchema);
