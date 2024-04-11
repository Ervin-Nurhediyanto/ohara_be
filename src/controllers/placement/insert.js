const Placement = require('../../models/placement')

module.exports = async (req, res) => {
  const { name } = req.body

  const addPlacement = new Placement({
    name: name.toUpperCase()
  })

  try {
    const placement = await addPlacement.save()

    res.status(201).json({
      message: 'Add Placement Success',
      data: placement
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
