const express = require('express')
const router = express.Router()
const controller = require('../controllers/positions/index')
const { verifyAccess } = require('../middlewares/auth')

router
  .post('/', verifyAccess, controller.insert)
  .get('/', verifyAccess, controller.get)
  .patch('/:id', verifyAccess, controller.update)
  .delete('/:id', verifyAccess, controller.delete)

module.exports = router
