const Presences = require('../../models/presences')

module.exports = async (req, res) => {
  const { classId, day, date, time, status } = req.body

  try {
    const data = {
      classId,
      day,
      date,
      time,
      status,
      image: ''
    }

    const newPresence = new Presences(data)
    const newData = await newPresence.save()

    res.status(201).json({
      message: 'Add Success',
      data: newData
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'finance error',
        data: err
      }
    })
  }
}
