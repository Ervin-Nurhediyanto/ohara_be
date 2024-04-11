const Information = require('../../models/information')

module.exports = async (req, res) => {
  const { name, page, limit, sort } = req.query
  let query = null

  if (name) {
    query = {
      name: {'$regex': name.toUpperCase()}
    }
  }

  let options = {
    sort: {
      _id: 1
    },
    limit: null,
    skip: 0
  }

  if (sort) {
    if (sort.toUpperCase() === 'DESC') {
      options.sort._id = -1
    }
  }

  if (limit) {
    options.limit = Number(limit)
  }

  if (page) {
    options.skip = (Number(page) - 1) * options.limit
  }

  try {
    const collection = Information.find(query).sort(options.sort)
    const allData = await collection
    const informations = await collection.limit(options.limit).skip(options.skip)

    res.status(200).json({
      links: {
        totalData: allData.length,
        totalPage: Math.ceil(allData.length / options.limit),
        currentPage: Number(page) || 1
      },
      data: informations
    })
  } catch(err){
    res.json({message: err})
  }
}
