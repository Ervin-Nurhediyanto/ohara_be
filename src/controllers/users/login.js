const Users = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  const { username, password } = req.body

  try {
    const result = await Users.findOne({ username })

    if (!result) {
      res.status(401).json({
        error: {
          code: 401,
          message: 'user not found'
        }
      })
    } else {
      const user = result
      const hash = user.password

      bcrypt.compare(password, hash).then((resCompare) => {
        if (!resCompare) {
          res.status(401).json({
            error: {
              code: 401,
              message: 'Unauthenticated'
            }
          })
        } else {
          const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
          }

          jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '3h' }, (_err, token) => {

            res.status(200).json({
              data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                address: user.address,
                image: user.image,
                gender: user.gender,
                phoneNumber: user.phoneNumber,
                position: user.position,
                placement: user.placement,
                image: user.image,
                nik: user.nik,
                status: user.status,
                roleId: user.roleId,
                token: token
              }
            })
          })
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
