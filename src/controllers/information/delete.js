const Information = require('../../models/information')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const informationDelte = await Information.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: informationDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
