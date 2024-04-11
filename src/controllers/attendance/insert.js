const Attendance = require('../../models/attendance')

module.exports = async (req, res) => {
  const { userId, name, image, information, date, shift, lat, lng, remark, position, placement } = req.body

  const data = {
    userId,
    name,
    information: information.toUpperCase(),
    date: date || new Date().toString(),
    shift: shift.toUpperCase(),
    lat,
    lng,
    remark,
    position: position.toUpperCase(),
    placement: placement.toUpperCase()
  }

  if (req.files) {
    data.image = req.files.map((item) => {
      return process.env.BASE_URL + 'uploads/' + item.filename
    }).join()
  } else {
    data.image = image
  }

  const newAttendace = new Attendance(data)

  try {
    const attendance = await newAttendace.save()

    res.status(201).json({
      message: 'Attendance Success',
      data: attendance,
      date: attendance.date.toString()
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: '',
        data: err
      }
    })
  }
}
