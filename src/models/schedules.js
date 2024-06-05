const mongoose = require('mongoose')

const schedulesSchema = mongoose.Schema({
  studentId: {
    type: String,
  },
  tutorId: {
    type: String,
  },
  productId: {
    type: String
  },
  productName: {
    type: String
  },
  date: {
    type: String
  },
  day: {
    type: String
  },
  time: {
    type: String
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Schedules', schedulesSchema)
