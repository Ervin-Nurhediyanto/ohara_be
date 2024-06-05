const Schedules = require('../../models/schedules')

module.exports = async (req, res) => {
  const id = req.params.id
  const { studentId, tutorId, productId, productName, date, day, time, status } = req.body

  try {
    let data = {}

    if (studentId) { data.studentId = studentId }
    if (tutorId) { data.tutorId = tutorId }
    if (productId) { data.productId = productId }
    if (productName) { data.productName = productName }
    if (date) { data.date = date }
    if (day) { data.day = day }
    if (time) { data.time = time }
    if (status) { data.status = status }

    const dataUpdate = await Schedules.updateOne({_id: id}, data)

    res.status(200).json({
      message: 'Update Success',
      data: dataUpdate
    })
  } catch(err){
    res.json({
      error: {
        message: err
      }
    })
  }
}
