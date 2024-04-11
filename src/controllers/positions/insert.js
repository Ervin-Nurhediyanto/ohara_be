const Positions = require('../../models/positions')

module.exports = async (req, res) => {
  const { name } = req.body

  const addPosition = new Positions({
    name: name.toUpperCase()
  })

  try {
    const position = await addPosition.save()

    res.status(201).json({
      message: 'Add Position Success',
      data: position
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
