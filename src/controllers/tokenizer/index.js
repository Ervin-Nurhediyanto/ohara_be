import Midtrans from "midtrans-client"

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT
})

module.exports = async (req, res) => {
  const { id, productName, price, quantity } = await req.json()
  let parameter = {
    item_details: {
      name: productName,
      price: price,
      quantity: quantity
    },
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity
    }
  }

  const token = await snap.createTransactionToken(parameter)
  console.log('token : ')
  console.log(token)

//   res.status(201).json({
//     message: 'Register Success',
//     data: user
//   })
// } catch(err){
//         res.status(422).json({
//           error: {
//             message: 'Username/NIK/Email already exists',
//             data: err
//           }
//         })
//       }
}

// export async function POST(request) {
//   const {id, productName, price, quantity} = await request.json()
//   let parameter = {
//     item_details: {
//       name: productName,
//       price: price,
//       quantity: quantity
//     },
//     transaction_details: {
//       order_id: id,
//       gross_amount: price * quantity
//     }
//   }

//   const token = await snap.createTransactionToken(parameter)
//   console.log('token : ')
//   console.log(token)
// }

// const Roles = require('../../models/roles')
// const Users = require('../../models/users')
// const bcrypt = require('bcrypt')

// module.exports = async (req, res) => {
//   const role = req.params.role
//   // const { username, name, nik, password, email, phoneNumber, address, gender, position, placement } = req.body
//   const { username, password, email } = req.body
//   const hashPassword = await bcrypt.hash(password, 10)

//   try {
//     const collection = await Roles.findOne({ name: role.toUpperCase() })
//     const data = {
//       username,
//       // name: name.toUpperCase(),
//       // nik,
//       password: hashPassword,
//       email,
//       phoneNumber: '',
//       address: '',
//       gender: '',
//       // gender: gender.toUpperCase(),
//       // position,
//       // placement,
//       image: '',
//       status: 'disable',
//       roleId: collection._id
//     }

//     const userRegister = new Users(data)
//     const user = await userRegister.save()

//     res.status(201).json({
//       message: 'Register Success',
//       data: user
//     })
//   } catch(err){
//     res.status(422).json({
//       error: {
//         message: 'Username/NIK/Email already exists',
//         data: err
//       }
//     })
//   }
// }
