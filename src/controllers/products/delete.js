const Products = require('../../models/products')

module.exports = async (req, res) => {
  const id = req.params.id

  try {
    const productDelte = await Products.deleteOne({_id: id})

    res.status(200).json({
      message: 'Delete Success',
      data: productDelte
    })
  } catch(err){
    res.json({message: err})
  }
}
