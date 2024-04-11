require('dotenv').config()
const express = require('express')
const http = require('http')
// const socket = require('socket.io')
const app = express()
const server = http.createServer(app)
// const io = socket(server)
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./src/routes/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api/v1/', routes)

// set the view engine to ejs
app.set('view engine', 'ejs');

// connect to DB
// if (process.env.NODE_ENV === 'production') {
//   const connection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
//   mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//   let db = mongoose.connection

//   db.on('error', console.error.bind(console, 'Database connect Error!'))
//   db.once('open', () => {
//   console.log('Database Atlas is Connected')
//   })
// } else {
//   mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//   let db = mongoose.connection

//   db.on('error', console.error.bind(console, 'Database connect Error!'))
//   db.once('open', () => {
//   console.log('Database is Connected')
//   })
// }

// connect to DB
if (process.env.NODE_ENV === 'production') {
  // const connection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  const connection = `mongodb+srv://oharabimbelofficial:O'hara4424@cluster0.6vgx6ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  let db = mongoose.connection

  db.on('error', console.error.bind(console, 'Database connect Error!'))
  db.once('open', () => {
  console.log('Database Atlas is Connected')
  })
} else {
  mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  let db = mongoose.connection

  db.on('error', console.error.bind(console, 'Database connect Error!'))
  db.once('open', () => {
  console.log('Database is Connected')
  })
}

const PORT = process.env.PORT || 3000

app.use('/uploads', express.static('./uploads'))
server.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT + ' 🚀'))
