const express = require('express')
const router = express.Router()
const controller = require('../controllers/users/index')
const { verifyAccess } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

router
  // .get('/', verifyAccess, controller.get)
  .get('/', controller.get)
  .get('/:id', controller.find)
  .post('/register/:role', controller.insert)
  .post('/login', controller.login)
  .post('/forgot-password', controller.forgotPassword)
  .post('/reset-password/:id', controller.resetPassword)
  .patch('/:id', upload, controller.update)
  .delete('/:id', controller.delete)

module.exports = router
