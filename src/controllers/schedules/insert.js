const Schedules = require('../../models/schedules')

module.exports = async (req, res) => {
  const { studentId, tutorId, productId, productName, date, day, time, status } = req.body

  try {
    const data = {
      studentId,
      tutorId,
      productId,
      productName,
      date,
      day,
      time,
      status
    }

    const newSchedule = new Schedules(data)
    const newData = await newSchedule.save()

    res.status(201).json({
      message: 'Add Data Success',
      data: newData
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'data already exists',
        data: err
      }
    })
  }
}
