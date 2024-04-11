const mongoose = require('mongoose')

const informationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique : true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Information', informationSchema)
