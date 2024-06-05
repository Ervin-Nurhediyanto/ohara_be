const Classes = require('../../models/classes')

module.exports = async (req, res) => {
  const { studentId, tutorId, productId, packetId, scheduleId, product, grade, tutor, student, mapel, sesion } = req.body

  try {
    const data = {
      studentId,
      tutorId,
      productId,
      packetId,
      scheduleId,
      product,
      grade,
      tutor,
      student,
      mapel,
      sesion,
    }

    const newClass = new Classes(data)
    const newData = await newClass.save()

    res.status(201).json({
      message: 'Add Success',
      data: newData
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'error',
        data: err
      }
    })
  }
}
