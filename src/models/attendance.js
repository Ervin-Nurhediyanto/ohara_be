const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  information: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  position: {
    type: String
  },
  placement: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Attendance', attendanceSchema)
