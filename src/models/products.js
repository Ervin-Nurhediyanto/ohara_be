const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  mapel: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Products', productsSchema)
