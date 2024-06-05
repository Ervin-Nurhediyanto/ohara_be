const Classes = require('../../models/classes')

module.exports = async (req, res) => {
  const { studentId, tutorId, productId, packetId, scheduleId, product, grade, tutor, student, mapel, sesion, page, limit, sort } = req.query
  
  let query = {
    studentId: { '$regex': '' },
    tutorId: { '$regex': '' },
    productId: { '$regex': '' },
    packetId: { '$regex': '' },
    scheduleId: { '$regex': '' },
    product: { '$regex': '' },
    grade: { '$regex': '' },
    tutor: { '$regex': '' },
    student: { '$regex': '' },
    mapel: { '$regex': '' },
    sesion: { '$regex': '' },
  }

  if (studentId) { query.studentId = {'$regex': studentId}}
  if (tutorId) { query.tutorId = {'$regex': tutorId}}
  if (productId) { query.productId = {'$regex': productId}}
  if (packetId) { query.packetId = {'$regex': packetId}}
  if (scheduleId) { query.scheduleId = {'$regex': scheduleId}}
  if (product) { query.product = {'$regex': product}}
  if (grade) { query.grade = {'$regex': grade}}
  if (tutor) { query.tutor = {'$regex': tutor}}
  if (student) { query.student = {'$regex': student}}
  if (mapel) { query.mapel = {'$regex': mapel}}
  if (sesion) { query.sesion = {'$regex': sesion}}

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
    const collection = Classes.find(query).sort(options.sort)
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
