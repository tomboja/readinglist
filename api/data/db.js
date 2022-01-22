/**
 * database connection code is here
 * auth: tdessalegn
 */
const mongoose = require('mongoose')

const { DB_URL, DB_DISCONNECT_MSG, DB_CONNECT_MSG } = process.env

mongoose.connect(DB_URL)

require('./books-model')

mongoose.connection.on('connected', () => {
  console.log(`${DB_CONNECT_MSG} ${DB_URL}`)
})

mongoose.connection.on('disconnected', () => {
  console.log(`${DB_DISCONNECT_MSG} ${DB_URL}`)
})

mongoose.connection.on('error', (error) => {
  console.error(`${DB_CONNECTION_ERROR_MSG} ${DB_URL}: Error: ${error}`)
})

process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.info(process.env.SIGINT_MSG)
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  mongoose.connection.close(function () {
    console.log(process.env.SIGINT_MSG)
    process.exit(0)
  })
})
