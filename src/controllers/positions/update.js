const Positions = require('../../models/positions')

module.exports = async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  try {
    const positionUpdate = await Positions.updateOne({_id: id}, { name: name.toUpperCase() })

    res.status(200).json({
      message: 'Update Success',
      data: positionUpdate
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'Position name already exists',
        data: err
      }
    })
  }
}
