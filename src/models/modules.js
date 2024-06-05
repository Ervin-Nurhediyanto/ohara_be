const mongoose = require('mongoose')

const modulesSchema = mongoose.Schema({
  packetId: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Modules', modulesSchema)
