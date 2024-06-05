const Classes = require('../../models/classes')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Classes.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: data
    })
  } catch(err){
    res.json({message: err})
  }
}
