const Packets = require('../../models/packets')
const path = require('path')

module.exports = async (req, res) => {
  const id = req.params.id
  const { name, description, points, mapel, grade, price, productId } = req.body
  console.log('points', points)
  try {
    let data = {}

    if (name) { data.name = name.toUpperCase() }
    if (description) { data.description = description }
    if (points) { data.points = points }
    if (mapel) { data.mapel = mapel }
    if (grade) { data.grade = grade }
    if (price) { data.price = price }
    if (productId) { data.productId = productId }

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

    const packetUpdate = await Packets.updateOne({_id: id}, data)

    res.status(200).json({
      message: 'Update Success',
      data: packetUpdate,
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
