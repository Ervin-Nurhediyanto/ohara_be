const Users = require('../../models/users')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const user = await Users.find({ _id: id })
    res.status(200).json({
      data: user
    })
  } catch(err){
    res.json({message: err})
  }
}
