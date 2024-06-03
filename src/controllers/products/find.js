const Products = require('../../models/products')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const product = await Products.find({ _id: id })
    res.status(200).json({
      data: product
    })
  } catch(err){
    res.json({message: err})
  }
}
