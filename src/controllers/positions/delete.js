const Positions = require('../../models/positions')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const positionDelte = await Positions.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: positionDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
