const Roles = require('../../models/roles')

module.exports = async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  try {
    const roleUpdate = await Roles.updateOne({_id: id}, { name: name.toUpperCase() })

    res.status(200).json({
      message: 'Update Success',
      data: roleUpdate
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'Role name already exists',
        data: err
      }
    })
  }
}
