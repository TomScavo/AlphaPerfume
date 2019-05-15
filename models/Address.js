const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    isRequired: true
  },
  number: {
    type: String,
    isRequired: true
  },
  province: {
    type: String,
    isRequired: true
  },
  city: {
    type: String,
    isRequired: true
  },
  area: {
    type: String,
    isRequired: true
  },
  detail: {
    type: String,
    isRequired: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Address = mongoose.model('address', AddressSchema);
