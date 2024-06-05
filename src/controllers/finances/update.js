const Finances = require('../../models/finances')
const path = require('path')

module.exports = async (req, res) => {
  const id = req.params.id
  const { userId, productId, price, status } = req.body

  try {
    let data = {}

    if (userId) { data.userId = userId }
    if (productId) { data.productId = productId }
    if (price) { data.price = price }
    if (status) { data.status = status }

    // Path dir
    const pathObj = path.parse(__dirname)
    let pathDir = pathObj.dir.split('\\src\\controllers')[0]
    const dir = []
    pathDir.split('\\').map((item) => {
      dir.push(item + '/')
    })
    pathDir = dir.join('')

    if (req.files.length > 0) {
      data.image = req.files.map((item) => {
        return process.env.BASE_URL + 'uploads/' + item.filename
      }).join()
    }

    const dataUpdate = await Finances.updateOne({_id: id}, data)

    res.status(200).json({
      message: 'Update Success',
      data: dataUpdate,
      pathDir: pathDir
    })
  } catch(err){
    res.json({
      error: {
        message: err
      }
    })
  }
}
