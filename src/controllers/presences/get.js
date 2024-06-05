const Presences = require('../../models/presences')

module.exports = async (req, res) => {
  const { classId, day, date, time, status, page, limit, sort } = req.query
  let query = {
    classId: { '$regex': '' },
    day: { '$regex': '' },
    date: { '$regex': '' },
    time: { '$regex': '' },
    status: { '$regex': '' }
  }

  if (classId) { query.classId = {'$regex': classId}}
  if (day) { query.day = {'$regex': day}}
  if (date) { query.date = {'$regex': date}}
  if (time) { query.time = {'$regex': time}}
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
    const collection = Presences.find(query).sort(options.sort)
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
