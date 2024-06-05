const Modules = require('../../models/modules')

module.exports = async (req, res) => {
  const id = req.params.id
  const { packetId, name, description, url } = req.body

  try {
    let data = {}

    if (packetId) { data.packetId = packetId }
    if (name) { data.name = name }
    if (description) { data.description = description }
    if (url) { data.url = url }

    const dataUpdate = await Modules.updateOne({_id: id}, data)

    res.status(200).json({
      message: 'Update Success',
      data: dataUpdate
    })
  } catch(err){
    res.json({
      error: {
        message: err
      }
    })
  }
}
