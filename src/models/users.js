const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  // name: {
  //   type: String,
  //   required: true
  // },
  // nik: {
  //   type: String,
  //   unique : true,
  //   required: true
  // },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique : true,
    required: true
  },
  mapel: {
    type: String
  },
  phoneNumber: {
    type: String
    // required: true
  },
  address: {
    type: String
    // required: true
  },
  gender: {
    type: String
  },
  image: {
    type: String
  },
  // position: {
  //   type: String
  // },
  // placement: {
  //   type: String
  // },
  status: {
    type: String
  },
  roleId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users', usersSchema)
