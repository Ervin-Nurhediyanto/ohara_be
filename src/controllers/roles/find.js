const Roles = require('../../models/roles')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const role = await Roles.find({ _id: id })
    res.status(200).json({
      data: role
    })
  } catch(err){
    res.json({message: err})
  }
}
