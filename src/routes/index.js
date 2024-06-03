const express = require('express')
const roleRouters = require('./roles')
const userRouters = require('./users')
const productRouters = require('./products')
const packetRouters = require('./packets')
// const financeRouters = require('./finances')
// const scheduleRouters = require('./schedules')
// const moduleRouters = require('./modules')

const router = express.Router()

router
  .use('/roles', roleRouters)
  .use('/users', userRouters)
  .use('/products', productRouters)
  .use('/packets', packetRouters)

module.exports = router

// const attendanceRouters = require('./attendance')
// const positionRouters = require('./positions')
// const placementRouters = require('./placement')
// const informationRouters = require('./information')
// const shiftRouters = require('./shifts')

// .use('/attendance', attendanceRouters)
// .use('/positions', positionRouters)
// .use('/placements', placementRouters)
// .use('/informations', informationRouters)
// .use('/shifts', shiftRouters)