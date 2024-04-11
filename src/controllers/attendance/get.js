const Attendance = require('../../models/attendance')

module.exports = async (req, res) => {
  const { name, information, shift, position, placement, startYear, startMonth, startDay, endYear, endMonth, endDay, page, limit, sort } = req.query
  let query = {
    name: { '$regex': '' },
    information: { '$regex': '' },
    shift: { '$regex': '' },
    position: { '$regex': '' },
    placement: { '$regex': '' },
    createdAt: { $lte : new Date() }
  }

  if (name) { query.name = {'$regex': name.toUpperCase()} }
  if (information) { query.information = {'$regex': information.toUpperCase()} }
  if (shift) { query.shift = {'$regex': shift.toUpperCase()} }
  if (position) { query.position = {'$regex': position.toUpperCase()} }
  if (placement) { query.placement = {'$regex': placement.toUpperCase()} }

  // Filter Date
  if (startYear && startMonth && startDay && endYear && endMonth && endDay) {
    query.createdAt = {
        $gte : new Date(Number(startYear), Number(startMonth) - 1, Number(startDay)),
        $lte : new Date(Number(endYear), Number(endMonth) - 1, Number(endDay) + 1)
      }
    }

  let options = {
    sort: {
      createdAt: -1
    },
    limit: null,
    skip: 0
  }

  if (sort) {
    if (sort.toUpperCase() === 'ASC') {
      options.sort.createdAt = 1
    }
  }

  if (limit) {
    options.limit = Number(limit)
  }

  if (page) {
    options.skip = (Number(page) - 1) * options.limit
  }

  try {
    const collection = Attendance.find(query).sort(options.sort)
    const allData = await collection
    const attendance = await collection.limit(options.limit).skip(options.skip)

    res.status(200).json({
      links: {
        totalData: allData.length,
        totalPage: Math.ceil(allData.length / options.limit),
        currentPage: Number(page) || 1
      },
      data: attendance
    })
  } catch(err){
    res.json({message: err})
  }
}
