const Schedules = require('../../models/schedules')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Schedules.find({ _id: id })
    res.status(200).json({
      data: data
    })
  } catch(err){
    res.json({message: err})
  }
}
