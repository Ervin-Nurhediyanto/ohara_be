const express = require('express')
const router = express.Router()
const controller = require('../controllers/attendance/index')
const { upload } = require('../middlewares/multer')
const { verifyAccess } = require('../middlewares/auth')

router
  .post('/', verifyAccess, upload, controller.insert)
  .get('/', verifyAccess, controller.get)
  .patch('/:id', verifyAccess, upload, controller.update)
  .delete('/:id', verifyAccess, controller.delete)
  .get('/download', verifyAccess, controller.download)

module.exports = router
