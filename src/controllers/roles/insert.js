const Roles = require('../../models/roles')

module.exports = async (req, res) => {
  const { name } = req.body

  const addRole = new Roles({
    name: name.toUpperCase()
  })

  try {
    const role = await addRole.save()

    res.status(201).json({
      message: 'Add Role Success',
      data: role
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
