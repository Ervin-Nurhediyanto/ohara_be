const Attendance = require('../../models/attendance')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
  const id = req.params.id
  const { userId, name, information, date, shift, lat, lng, remark, position, placement } = req.body

  try {
    let data = {
      userId,
      name,
      information: information.toUpperCase(),
      date: date || new Date(),
      shift: shift.toUpperCase(),
      lat,
      lng,
      remark,
      position: position.toUpperCase(),
      placement: placement.toUpperCase()
    }

    // Path dir
    const pathObj = path.parse(__dirname)
    let pathDir = pathObj.dir.split('\\src\\controllers')[0]
    const dir = []
    pathDir.split('\\').map((item) => {
      dir.push(item + '/')
    })
    pathDir = dir.join('')

    // Old file
    const collection = await Attendance.findOne({ _id: id })
    const fileName = collection.image.split(process.env.BASE_URL + 'uploads')[1]
    const filePath = pathDir + '/uploads/' + fileName;

    if (req.files.length > 0) {
      // Delete old file
      fs.unlinkSync(filePath);

      // Update new file
      data.image = req.files.map((item) => {
        return process.env.BASE_URL + 'uploads/' + item.filename
      }).join()
    } else {
      data.image = collection.image
    }

    const attendanceUpdate = await Attendance.updateOne({_id: id}, data)

    res.status(200).json({
      message: 'Update Success',
      data: attendanceUpdate,
      pathDir: pathDir
    })
  } catch(err){
    res.json({message: err})
  }
}
