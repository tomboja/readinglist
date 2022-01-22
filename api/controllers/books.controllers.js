/**
 * Books controller
 * auth: tdessalegn
 */

const mongoose = require('mongoose')
const Book = mongoose.model(process.env.DB_BOOK_MODEL)

const getAll = function (req, res) {
  console.log(`Books Controller GET all books request`)
  let count = parseInt(process.env.DB_QUERY_COUNT)
  let offset = parseInt(process.env.DB_QUERY_OFFSET)
  const maxCount = parseInt(process.env.DB_QUERY_LIMIT)

  if (req.query && req.query.count) {
    count = parseInt(req.query.count)
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset)
  }

  if (count > maxCount) {
    // better to make error mentioning why count cannot be more than max
    res.status(400).json({ message: `DB query Count cannot exceed maxcount of ${maxCount}` })
    return
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: `DB query count and/or offset is not a number` })
    return
  }

  Book.find().skip(offset).limit(count).exec(function (error, books) {
    const response = {
      status: 200,
      message: books
    }
    if (error) {
      console.log('Error occured whn fetching books ', error)
      response.status = 500
      response.message = error
    }
    res.status(response.status).json(response.message)
  })
}

const getOne = function (req, res) {
  console.log(`Books Controller GET one book request`)
  const bookId = req.params.bookId
  if (!mongoose.isValidObjectId(bookId)) {
    console.log(`Requested book id: ${bookId} is not valid id`)
    res.status(400).json({ message: `Requested book id ${bookId} is not valid id` })
    return
  }
  Book.findById(bookId).exec(function (error, book) {

    const response = {
      status: 200,
      message: book
    }

    if (error) {
      console.log(`Error occured while getting book with id ${bookId}`, error)
      response.status = 500
      response.message = error
    } else if (!book) {
      const msg = { message: `Book with id ${bookId} not available in the database` }
      console.log(msg)
      response.status = 404
      response.message = msg
    }
    res.status(response.status).json(response.message)
  })

}

const addOne = function (req, res) {
  console.log(`Books controller POST book request`)
  const newBook = {
    title: req.body.title,
    numberOfPages: parseInt(req.body.numberOfPages),
    publisher: req.body.publisher
  }

  Book.create(newBook, function (error, book) {
    const response = {
      status: 201,
      message: book
    }
    if (error) {
      console.log('Error creating new book to db')
      response.status = 500
      response.message = error
    }
    res.status(response.status).json(response.message)
  })

}

const updateOne = function (req, res) {
  console.log(`Books controller PUT book request`)
  const bookId = req.params.bookId
  const bookObject = {
    title: req.body.title,
    numberOfPages: parseInt(req.body.numberOfPages),
    publisher: req.body.publisher
  }

  if (!mongoose.isValidObjectId(bookId)) {
    console.log(`Requested book id: ${bookId} is not valid id`)
    res.status(400).json({ message: `Requested book id ${bookId} is not valid id` })
    return
  }

  Book.findOneAndUpdate(bookId, bookObject, { new: true })
    .exec(function (error, updatedBook) {
      const response = {
        status: 200,
        message: updatedBook
      }
      if (error) {
        console.log(`Error occured while updating book with id: ${bookId}`)
        response.status = 500
        response.message = error
      } else if (!updatedBook) {
        const msg = { message: `Book with id: ${bookId} not found in the database` }
        console.log(msg)
        response.status = 404
        response.message = msg
      }
      res.status(response.status).json(response.message)
    })
}

const deleteOne = function (req, res) {
  console.log(`Books controller DELETE book request`)
  const bookId = req.params.bookId
  if (!mongoose.isValidObjectId(bookId)) {
    console.log(`Requested book id: ${bookId} is not valid id`)
    res.status(400).json({ message: `Requested book id ${bookId} is not valid id` })
    return
  }

  Book.findByIdAndDelete(bookId).exec(function (error, deletedBook) {
    const response = {
      status: 204,
      message: deletedBook
    }
    if (error) {
      console.log(`Error deleting a book with book id: ${bookId}`)
      response.status = 500
      response.message = error
    } else if (!deletedBook) {
      const msg = { message: `Book with id: ${bookId} not found in database` }
      console.log(msg)
      response.status = 404
      response.message = msg
    }
    res.status(response.status).json(response.message)
  })
}

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne
}
