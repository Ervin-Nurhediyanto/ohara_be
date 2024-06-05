const Presences = require('../../models/presences')
const path = require('path')

module.exports = async (req, res) => {
  const id = req.params.id
  const { classId, day, date, time, status } = req.body

  try {
    let data = {}

    if (classId) { data.classId = classId }
    if (day) { data.day = day }
    if (date) { data.date = date }
    if (time) { data.time = time }
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

    const dataUpdate = await Presences.updateOne({_id: id}, data)

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
