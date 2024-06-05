const Schedules = require('../../models/schedules')

module.exports = async (req, res) => {
  const { studentId, tutorId, productId, productName, date, day, time, status, page, limit, sort } = req.query
  let query = { 
    studentId: { '$regex': '' },
    tutorId: { '$regex': '' },
    productId: { '$regex': '' },
    productName: { '$regex': '' },
    date: { '$regex': '' },
    day: { '$regex': '' },
    time: { '$regex': '' },
    status: { '$regex': '' }
  }

  if (studentId) { query.studentId = {'$regex': studentId}}
  if (tutorId) { query.tutorId = {'$regex': tutorId}}
  if (productId) { query.productId = {'$regex': productId}}
  if (productName) { query.productName = {'$regex': productName}}
  if (date) { query.date = {'$regex': date}}
  if (day) { query.day = {'$regex': day}}
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
    const collection = Schedules.find(query).sort(options.sort)
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
