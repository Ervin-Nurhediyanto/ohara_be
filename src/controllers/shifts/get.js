const Shifts = require('../../models/shifts')

module.exports = async (req, res) => {
  const { name, page, limit, sort } = req.body
  let query = null

  if (name) {
    query = {
      name: {'$regex': name.toUpperCase()}
    }
  }

  let options = {
    sort: {
      name: 1
    },
    limit: 10,
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
    const collection = Shifts.find(query).sort(options.sort)
    const allData = await collection
    const shifts = await collection.limit(options.limit).skip(options.skip)

    res.status(200).json({
      links: {
        totalData: allData.length,
        totalPage: Math.ceil(allData.length / options.limit),
        currentPage: Number(page) || 1
      },
      data: shifts
    })
  } catch(err){
    res.json({message: err})
  }
}
