const mongoose = require('mongoose')

const financesSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: String
  },
  productName: {
    type: String
  },
  price: {
    type: String
  },
  image: {
    type: String
  },
  status: {
    type: String
  },
  datePay: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Finances', financesSchema)
