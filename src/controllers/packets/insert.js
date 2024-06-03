const Packets = require('../../models/packets')

module.exports = async (req, res) => {
  const { name, description, productId } = req.body

  try {
    const data = {
      name,
      description,
      points: [],
      image: '',
      mapel: '',
      grade: '',
      price: '',
      productId
    }

    const newPacket = new Packets(data)
    const packet = await newPacket.save()

    res.status(201).json({
      message: 'Add Packet Success',
      data: packet
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'name packet already exists',
        data: err
      }
    })
  }
}
