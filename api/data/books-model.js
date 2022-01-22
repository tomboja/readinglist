/**
 * Book model
 * Book has a title, number_of_pages and publisher
 * Publisher has name and country
 * 
 * auth: tdessalegn
 */

const mongoose = require('mongoose')

const publisherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: String,
})

const bookSchema = mongoose.Schema({
  title: {
    type: String, required: true
  },
  numberOfPages: Number,
  publisher: [publisherSchema]
})

mongoose.model('Book', bookSchema, 'books')
