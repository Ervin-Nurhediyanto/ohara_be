const mongoose = require('mongoose')

const packetsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  points: {
    type: Array
  },
  image: {
    type: String
  },
  mapel: {
    type: String
  },
  grade: {
    type: String
  },
  price: {
    type: String
  },
  productId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Packets', packetsSchema)
