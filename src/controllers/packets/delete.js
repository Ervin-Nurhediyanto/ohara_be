const Packets = require('../../models/packets')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const packetDelte = await Packets.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: packetDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
