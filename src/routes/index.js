const express = require('express')
const userRouters = require('./users')
const roleRouters = require('./roles')
const attendanceRouters = require('./attendance')
const positionRouters = require('./positions')
const placementRouters = require('./placement')
const informationRouters = require('./information')
const shiftRouters = require('./shifts')

const router = express.Router()

router
  .use('/roles', roleRouters)
  .use('/users', userRouters)
  // .use('/attendance', attendanceRouters)
  // .use('/positions', positionRouters)
  // .use('/placements', placementRouters)
  // .use('/informations', informationRouters)
  // .use('/shifts', shiftRouters)

module.exports = router
