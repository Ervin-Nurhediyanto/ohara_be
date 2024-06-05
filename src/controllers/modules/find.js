const Modules = require('../../models/modules')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Modules.find({ _id: id })
    res.status(200).json({
      data: data
    })
  } catch(err){
    res.json({message: err})
  }
}
