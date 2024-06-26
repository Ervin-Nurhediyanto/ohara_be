const Finances = require('../../models/finances')

module.exports = async (req, res) => {
  const { userId, productId, productName, price, status } = req.body

  try {
    const data = {
      userId,
      productId,
      productName,
      price,
      status,
      image: '',
      datePay: ''
    }

    const newPacket = new Finances(data)
    const newData = await newPacket.save()

    res.status(201).json({
      message: 'Add Success',
      data: newData
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'finance error',
        data: err
      }
    })
  }
}
