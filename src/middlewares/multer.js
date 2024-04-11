const multer = require('multer')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

function upload (req, res, next) {
  const uploadFiles = multer({
    storage: storage,
    limits: { fileSize: 3000000 }
  }).array('image', 2)

  uploadFiles(req, res, function (err) {
    if (err) {
      res.status(422).json({
        error: err
      })
    } else {
      next()
    }
  })
}

module.exports = {
  upload
}
