const Modules = require('../../models/modules')

module.exports = async (req, res) => {
  const { packetId, name, description, url, page, limit, sort } = req.query
  
  let query = {
    packetId: { '$regex': '' },
    name: { '$regex': '' },
    description: { '$regex': '' },
    url: { '$regex': '' },
  }

  if (packetId) { query.packetId = {'$regex': packetId}}
  if (name) { query.name = {'$regex': name}}
  if (description) { query.description = {'$regex': description}}
  if (url) { query.url = {'$regex': url}}

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
    const collection = Modules.find(query).sort(options.sort)
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
