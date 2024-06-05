const express = require('express')
const router = express.Router()
const controller = require('../controllers/schedules/index')

router
  .get('/', controller.get)
  .get('/:id', controller.find)
  .post('/', controller.insert)
  .patch('/:id', controller.update)
  .delete('/:id', controller.delete)

module.exports = router
