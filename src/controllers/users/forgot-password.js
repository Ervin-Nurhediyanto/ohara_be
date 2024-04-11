const Users = require('../../models/users')
const { send } = require('../../middlewares/send-email')

module.exports = async (req, res) => {
  const { email } = req.query

  try {
    const user = await Users.find({ email: email})
    if (user.length > 0) {
      send(email)
      res.status(200).json({
        data: user
      })
    } else {
      res.status(404).json({
        error: {
          message: 'user not found'
        }
      })
    }
  } catch(err){
    res.json({
      error: {
        message: err
      }
    })
  }
}
