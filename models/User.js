const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    isRequired: true
  },
  password: {
    type: String,
    isRequired: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', userSchema);
