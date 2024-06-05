const Finances = require('../../models/finances')

module.exports = async (req, res) => {
  const { userId, productId, price, status } = req.body

  try {
    const data = {
      userId,
      productId,
      price,
      status,
      image: ''
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
