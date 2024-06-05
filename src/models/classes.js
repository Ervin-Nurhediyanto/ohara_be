const mongoose = require('mongoose')

const classesSchema = mongoose.Schema({
  studentId: {
    type: String
  },
  tutorId: {
    type: String
  },
  productId: {
    type: String
  },
  packetId: {
    type: String
  },
  scheduleId: {
    type: String
  },
  product: {
    type: String
  },
  grade: {
    type: String
  },
  tutor: {
    type: String
  },
  student: {
    type: String
  },
  mapel: {
    type: String
  },
  sesion: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Classes', classesSchema)
