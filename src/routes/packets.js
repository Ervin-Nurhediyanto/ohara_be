const express = require('express')
const router = express.Router()
const controller = require('../controllers/packets/index')
const { upload } = require('../middlewares/multer')

router
  .get('/', controller.get)
  .get('/:id', controller.find)
  .post('/', controller.insert)
  .patch('/:id', upload, controller.update)
  .delete('/:id', controller.delete)

module.exports = router
