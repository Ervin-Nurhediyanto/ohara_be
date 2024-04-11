const Placement = require('../../models/placement')

module.exports = async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  try {
    const placementUpdate = await Placement.updateOne({_id: id}, { name: name.toUpperCase() })

    res.status(200).json({
      message: 'Update Success',
      data: placementUpdate
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'Placement name already exists',
        data: err
      }
    })
  }
}
