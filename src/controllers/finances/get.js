const Finances = require('../../models/finances')

module.exports = async (req, res) => {
  const { userId, productId, productName, price, status, page, limit, sort } = req.query
  let query = {
    userId: { '$regex': '' },
    productId: { '$regex': '' },
    productName: { '$regex': '' },
    price: { '$regex': '' },
    status: { '$regex': '' }
  }

  if (userId) { query.userId = {'$regex': userId}}
  if (productId) { query.productId = {'$regex': productId}}
  if (productName) { query.productName = {'$regex': productName}}
  if (price) { query.status = {'$regex': price}}
  if (status) { query.status = {'$regex': status}}

  let options = {
    sort: {
      name: 1
    },
    limit: null,
    skip: 0
  }

  if (sort) {
    if (sort.toUpperCase() === 'DESC') {
      options.sort.name = -1
    }
  }

  if (limit) {
    options.limit = Number(limit)
  }

  if (page) {
    options.skip = (Number(page) - 1) * options.limit
  }

  try {
    const collection = Finances.find(query).sort(options.sort)
    const allData = await collection
    const data = await collection.limit(options.limit).skip(options.skip)

    res.status(200).json({
      links: {
        totalData: allData.length,
        totalPage: Math.ceil(allData.length / options.limit),
        currentPage: Number(page) || 1
      },
      data: data
    })
  } catch(err){
    res.json({message: err})
  }
}
