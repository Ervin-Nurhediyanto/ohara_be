const Products = require('../../models/products')

module.exports = async (req, res) => {
  const { name, description } = req.body

  try {
    const data = {
      name,
      description,
      image: '',
      mapel: ''
    }

    const newProduct = new Products(data)
    const product = await newProduct.save()

    res.status(201).json({
      message: 'Add Product Success',
      data: product
    })
  } catch(err){
    res.status(422).json({
      error: {
        message: 'name product already exists',
        data: err
      }
    })
  }
}
