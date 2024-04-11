const Placement = require('../../models/placement')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const placementDelte = await Placement.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: placementDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
