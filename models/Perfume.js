const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const perfumeSchema = new Schema({
  name: {
    type: String,
    isrequired: true
  },
  handle: {
    type: String,
    isrequired: true
  },
  description: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  type: {
    two: {
      left: {
        type: Number,
        isrequired: true
      },
      price: {
        type: Number,
        isrequired: true
      }
    },
    five: {
      left: {
        type: Number,
        isrequired: true
      },
      price: {
        type: Number,
        isrequired: true
      }
    },
    ten: {
      left: {
        type: Number,
        isrequired: true
      },
      price: {
        type: Number,
        isrequired: true
      }
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Perfume = mongoose.model('perfumes', perfumeSchema);
