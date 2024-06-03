const Packets = require('../../models/packets')

module.exports = async (req, res) => {
  const { name, description, mapel, grade, price, productId, page, limit, sort } = req.query
  let query = {
    name: { '$regex': '' },
    description: { '$regex': '' },
    mapel: { '$regex': '' },
    grade: { '$regex': '' },
    price: { '$regex': '' },
    productId: { '$regex': '' }
  }

  if (name) { query.username = {'$regex': name}}
  if (description) { query.description = {'$regex': description}}
  if (mapel) { query.mapel = {'$regex': mapel}}
  if (grade) { query.grade = {'$regex': grade}}
  if (price) { query.price = {'$regex': price}}
  if (productId) { query.productId = {'$regex': productId}}

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
    const collection = Packets.find(query).sort(options.sort)
    const allData = await collection
    const packets = await collection.limit(options.limit).skip(options.skip)

    res.status(200).json({
      links: {
        totalData: allData.length,
        totalPage: Math.ceil(allData.length / options.limit),
        currentPage: Number(page) || 1
      },
      data: packets
    })
  } catch(err){
    res.json({message: err})
  }
}
