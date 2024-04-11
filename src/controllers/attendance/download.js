const Attendance = require('../../models/attendance')
const XLSX = require("xlsx")
const path = require("path")
const fs = require("fs")

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

      const header = ["No", "Nama", "Keterangan", "Tanggal", "Shift", "Remark", "Posisi", "Penempatan"]
      const downloadData = []
      for (let i = 0; i < attendance.length; i++) {
        const date = `${attendance[i].date.split(' ')[1]} ${attendance[i].date.split(' ')[2]} ${attendance[i].date.split(' ')[3]} (${attendance[i].date.split(' ')[4]})`

        downloadData.push([i + 1, attendance[i].name, attendance[i].information, date, attendance[i].shift, attendance[i].remark, attendance[i].position, attendance[i].placement])
      }
      const rows = [header, ...downloadData]

      // Create Workbook
      const fileName = "JNE_Attendace"
      let wb = XLSX.utils.book_new()
      wb.Props = {
        Title: fileName,
        Author: "Cafein",
        CreatedDate: new Date()
      }

      // Create Sheet
      wb.SheetNames.push("Sheet 1")
      // Create Sheet with Data
      let ws = XLSX.utils.aoa_to_sheet(rows)
      wb.Sheets["Sheet 1"] = ws

      __dirname
      // Check existing folder
      const downloadFolder = path.resolve(__dirname, "../../../uploads")
      if (!fs.existsSync(downloadFolder)) {
        fs.mkdirSync(downloadFolder)
      }

      // Save File
      try {
        XLSX.writeFile(wb, `${downloadFolder}${path.sep}${fileName}.xls`)

        res.download(`${downloadFolder}${path.sep}${fileName}.xls`)

        res.status(200).json({
          message: 'Download XLSL Success',
          data: process.env.BASE_URL + `uploads/${fileName}.xls`
        })
      } catch (e) {
        console.log(e.message)
        throw e
      }
    } catch(err){
      res.json({message: err})
    }
}
