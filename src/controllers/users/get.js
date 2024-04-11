const Users = require('../../models/users')

module.exports = async (req, res) => {
  // const { username, name, nik, email, phoneNumber, address, gender, position, placement, status, page, limit, sort } = req.query
  const { username, email, status, page, limit, sort } = req.query
  let query = {
    username: { '$regex': '' },
    email: { '$regex': '' },
    status: { '$regex': '' }
  }

  if (username) { query.username = {'$regex': username}}
  if (email) { query.email = {'$regex': email}}
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
    const collection = Users.find(query).sort(options.sort)
    const allData = await collection
    const users = await collection.limit(options.limit).skip(options.skip)

    res.status(200).json({
      links: {
        totalData: allData.length,
        totalPage: Math.ceil(allData.length / options.limit),
        currentPage: Number(page) || 1
      },
      data: users
    })
  } catch(err){
    res.json({message: err})
  }
}
