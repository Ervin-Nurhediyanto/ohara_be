const Shifts = require('../../models/shifts')

module.exports = async (req, res) => {
  const { name } = req.body

  const addShift = new Shifts({
    name: name.toUpperCase()
  })

  try {
    const shift = await addShift.save()

    res.status(201).json({
      message: 'Add Shift Success',
      data: shift
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
