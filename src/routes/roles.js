const express = require('express')
const router = express.Router()
const controller = require('../controllers/roles/index')
const { verifyAccess } = require('../middlewares/auth')

router
  .post('/', controller.insert)
  .get('/', controller.get)
  .patch('/:id', verifyAccess, controller.update)
  .delete('/:id', verifyAccess, controller.delete)

module.exports = router
