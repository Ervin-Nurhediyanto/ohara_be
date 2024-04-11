const Information = require('../../models/information')

module.exports = async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  try {
    const informationUpdate = await Information.updateOne({_id: id}, { name: name.toUpperCase() })

    res.status(200).json({
      message: 'Update Success',
      data: informationUpdate
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'Information name already exists',
        data: err
      }
    })
  }
}
