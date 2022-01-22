/**
 * main starting page (app.js)
 * auth: tdessalegn
 */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

require('./api/data/db')

const routes = require('./api/routes')

app.use(morgan('dev'))
app.use(function (req, res, next) {
  console.log(`Request Method and url: ${req.method} ${req.url}`)
  next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

const server = app.listen(process.env.PORT, function () {
  const port = server.address().port
  console.log(`${process.env.MSG_SERVER_RUNNING} ${port}`)
})
