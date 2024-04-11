const Users = require('../../models/users')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  const id = req.params.id
  const { password } = req.body
  const hashPassword = await bcrypt.hash(password, 10)

  const data = {
    password: hashPassword
  }

  try {
    const resetPassowrd = await Users.updateOne({_id: id}, data)

    res.status(200).json({
      message: 'Reset password success',
      data: resetPassowrd
    })
  } catch(err) {
    res.json({
      error: {
        message: err
      }
    })
  }
}