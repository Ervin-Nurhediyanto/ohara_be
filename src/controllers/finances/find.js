const Finances = require('../../models/finances')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Finances.find({ _id: id })
    res.status(200).json({
      data: data
    })
  } catch(err){
    res.json({message: err})
  }
}
