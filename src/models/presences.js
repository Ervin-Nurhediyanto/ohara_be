const mongoose = require('mongoose')

const presencesSchema = mongoose.Schema({
  classId: {
    type: String
  },
  day: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  image: {
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

module.exports = mongoose.model('Presences', presencesSchema)
