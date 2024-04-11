const Attendance = require('../../models/attendance')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
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

    const attendanceDelte = await Attendance.deleteOne({_id: id})

    // Delete old file
    if (attendanceDelte.deletedCount > 0) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      message: 'Delete Success',
      data: attendanceDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
