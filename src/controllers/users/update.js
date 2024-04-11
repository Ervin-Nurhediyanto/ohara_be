const Users = require('../../models/users')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
  const id = req.params.id
  const { username, name, nik, email, phoneNumber, address, gender, position, placement, status } = req.body

  try {
    let data = {}

    if (username) { data.username = username }
    if (name) { data.name = name.toUpperCase() }
    if (nik) { data.nik = nik }
    if (email) { data.email = email }
    if (phoneNumber) { data.phoneNumber = phoneNumber }
    if (address) { data.address = address }
    if (gender) { data.gender = gender }
    if (position) { data.position = position }
    if (placement) { data.placement = placement }
    if (status) { data.status = status }

    // Path dir
    const pathObj = path.parse(__dirname)
    let pathDir = pathObj.dir.split('\\src\\controllers')[0]
    const dir = []
    pathDir.split('\\').map((item) => {
      dir.push(item + '/')
    })
    pathDir = dir.join('')

    // Old file
    const collection = await Users.findOne({ _id: id })
    const fileName = collection.image.split(process.env.BASE_URL + 'uploads')[1]
    const filePath = pathDir + '/uploads/' + fileName;

    if (req.files.length > 0) {
      // Delete old file
      if (fileName !== undefined) {
        fs.unlinkSync(filePath);
      }

      // Update new file
      data.image = req.files.map((item) => {
        return process.env.BASE_URL + 'uploads/' + item.filename
      }).join()
    } else {
      data.image = collection.image
    }

    const userUpdate = await Users.updateOne({_id: id}, data)

    res.status(200).json({
      message: 'Update Success',
      data: userUpdate,
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
