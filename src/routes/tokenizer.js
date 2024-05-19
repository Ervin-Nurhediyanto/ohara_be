const express = require('express')
const router = express.Router()
const controller = require('../controllers/tokenizer/index')

router
  .post('/tokenizer', controller)

module.exports = router
