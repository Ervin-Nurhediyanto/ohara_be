const Roles = require('../../models/roles')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const roleDelte = await Roles.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: roleDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
