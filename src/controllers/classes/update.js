const Classes = require('../../models/classes')

module.exports = async (req, res) => {
  const id = req.params.id
  const { studentId, tutorId, productId, packetId, scheduleId, product, grade, tutor, student, mapel, sesion } = req.body

  try {
    let data = {}

    if (studentId) { data.studentId = studentId }
    if (tutorId) { data.tutorId = tutorId }
    if (productId) { data.productId = productId }
    if (packetId) { data.packetId = packetId }
    if (scheduleId) { data.scheduleId = scheduleId }
    if (product) { data.product = product }
    if (grade) { data.grade = grade }
    if (tutor) { data.tutor = tutor }
    if (student) { data.student = student }
    if (mapel) { data.mapel = mapel }
    if (sesion) { data.sesion = sesion }

    const dataUpdate = await Classes.updateOne({_id: id}, data)

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
