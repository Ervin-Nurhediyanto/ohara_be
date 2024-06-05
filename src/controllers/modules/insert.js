const Modules = require('../../models/modules')

module.exports = async (req, res) => {
  const { packetId, name, description, url } = req.body

  try {
    const data = {
      packetId,
      name,
      description,
      url
    }

    const newModule = new Modules(data)
    const newData = await newModule.save()

    res.status(201).json({
      message: 'Add Success',
      data: newData
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'error',
        data: err
      }
    })
  }
}
