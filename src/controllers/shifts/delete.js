const Shifts = require('../../models/shifts')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const shiftDelte = await Shifts.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: shiftDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
