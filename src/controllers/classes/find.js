const Classes = require('../../models/classes')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Classes.find({ _id: id })
    res.status(200).json({
      data: data
    })
  } catch(err){
    res.json({message: err})
  }
}
