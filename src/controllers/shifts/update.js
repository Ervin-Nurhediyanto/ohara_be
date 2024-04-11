const Shifts = require('../../models/shifts')

module.exports = async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  try {
    const shiftUpdate = await Shifts.updateOne({_id: id}, { name: name.toUpperCase() })

    res.status(200).json({
      message: 'Update Success',
      data: shiftUpdate
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'Shift name already exists',
        data: err
      }
    })
  }
}
