const Information = require('../../models/information')

module.exports = async (req, res) => {
  const { name } = req.body

  const addInformation = new Information({
    name: name.toUpperCase()
  })

  try {
    const information = await addInformation.save()

    res.status(201).json({
      message: 'Add Information Success',
      data: information
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
