/**
 * Book publishers controller
 * auth: tdessalegn
 */

const mongoose = require('mongoose')

const Book = mongoose.model(process.env.DB_BOOK_MODEL)

const _addBookPublisher = function (req, res, book, response) {
  const publisher = {
    name: req.body.name,
    country: req.body.country
  }
  book.publisher.push(publisher)

  book.save(function (error, updatedBook) {
    if (error) {
      response.status = 500
      response.message = error
    }

    res.status(response.status).json(response.message)
  })
}

const _updateOnePublisher = function (req, res, book) {
  const publisherId = req.params.publisherId
  const publisher = book.publisher.id(publisherId)
  publisher.name = req.body.name
  publisher.country = req.body.country

  book.save(function (error, updatedBook) {
    const response = {
      status: 201,
      message: updatedBook
    }
    if (error) {
      response.status = 500
      response.message = error
    }
    res.status(response.status).json(response.message)
  })
}

const _deleteBookPublisher = function (req, res, book) {
  const publisherId = req.params.publisherId
  book.publisher.id(publisherId).remove()
  book.save(function (error, savedBook) {
    const response = {
      status: 200,
      message: savedBook
    }
    if (error) {
      console.log(`Error occured while deleting publisher with id: ${publisherId}`)
      response.status = 500
      response.message = error
    }
    res.status(response.status).json(response.message)
  })

}

const _getOnePublisher = function (req, res, book) {
  const publisherId = req.params.publisherId
  const publisher = book.publisher.id(publisherId)
  const response = {
    status: 200,
    message: publisher
  }
  if (!publisher) {
    response.status = 500
    response.message = { message: `Could not find publisher with id: ${publisherId}` }
  }
  res.status(response.status).json(response.message)
}

const getAll = function (req, res) {
  console.log(`Books Publisher Controller GET book publishers request`)
  const bookId = req.params.bookId
  // const publisherId = req.params.publisherId
  if (!mongoose.isValidObjectId(bookId)) {
    const msg = { message: `Requested book or publisher id: ${bookId} is not valid id` }
    console.log(msg)
    res.status(400).json(msg)
    return
  }

  Book.findById(bookId).select('publisher').exec(function (error, book) {
    const response = {
      status: 200,
      message: book
    }
    if (error) {
      const msg = { message: `Error occures finding publisher for book with id: ${bookId}` }
      console.log(msg)
      response.status = 500
      response.message = msg
    }
    else if (!book) {
      const msg = { message: `Book with id ${bookId} not available` }
      console.log(msg)
      response.status = 404
      response.message = msg
    }
    res.status(response.status).json(response.message)
  })
}

const addOne = function (req, res) {
  console.log(`Books Publisher controller POST publisher request`)
  const bookId = req.params.bookId
  // const publisherId = req.params.publisherId
  if (!mongoose.isValidObjectId(bookId)) {
    const msg = { message: `Requested book or publisher id: ${bookId} or ${publisherId} is not valid id` }
    console.log(msg)
    res.status(400).json(msg)
    return
  }
  Book.findById(bookId).select('publisher').exec(function (error, book) {
    const response = {
      status: 201,
      message: book
    }

    if (error) {
      console.log(`Error occures while finding book with id: ${bookId}`)
      response.status = 500
      response.message = error
    } else if (!book) {
      response.status = 404
      response.message = { message: `Book with id: ${bookId} not found in database` }
    }
    _addBookPublisher(req, res, book, response)
  })
}

const deleteOne = function (req, res) {
  console.log(`Book Publisher controller DELETE publisher request`)
  const bookId = req.params.bookId
  const publisherId = req.params.publisherId
  if (!mongoose.isValidObjectId(bookId) || !mongoose.isValidObjectId(publisherId)) {
    const msg = { message: `Requested book or publisher id: ${bookId} or ${publisherId} is not valid id` }
    console.log(msg)
    res.status(400).json(msg)
    return
  }

  Book.findById(bookId).select('publisher').exec(function (error, book) {
    const response = {
      status: 200,
      message: book
    }

    if (error) {
      console.log(`Error occures while finding book with id: ${bookId}`)
      response.status = 500
      response.message = error
    } else if (!book) {
      response.status = 404
      response.message = { message: `Book with id: ${bookId} not found in database` }
    }
    if (book) {
      _deleteBookPublisher(req, res, book)
    } else {
      res.status(response.status).json(response.message)
    }
  })
}


const updateOne = function (req, res) {
  console.log(`Books Publisher Controller PUT book publishers request`)
  const bookId = req.params.bookId
  const publisherId = req.params.publisherId
  if (!mongoose.isValidObjectId(bookId) || !mongoose.isValidObjectId(publisherId)) {
    const msg = { message: `Requested book or publisher id: ${bookId} or ${publisherId} is not valid id` }
    console.log(msg)
    res.status(400).json(msg)
    return
  }

  Book.findById(bookId).select('publisher').exec(function (error, book) {
    const response = {
      status: 200,
      message: book
    }
    if (error) {
      const msg = { message: `Error occures finding publisher with id: ${publisherId} for book with id: ${bookId}` }
      console.log(msg)
      response.status = 500
      response.message = msg
    }
    else if (!book) {
      const msg = { message: `Publisher with id ${publisherId} not available for this book` }
      console.log(msg)
      response.status = 404
      response.message = msg
    }
    if (book) {
      _updateOnePublisher(req, res, book)
    } else {
      res.status(response.status).json(response.message)
    }
  })
}

const getOne = function (req, res) {
  console.log(`Books Publisher Controller GET book publishers request`)
  const bookId = req.params.bookId
  const publisherId = req.params.publisherId
  if (!mongoose.isValidObjectId(bookId) || !mongoose.isValidObjectId(publisherId)) {
    const msg = { message: `Requested book or publisher id: ${bookId} or ${publisherId} is not valid id` }
    console.log(msg)
    res.status(400).json(msg)
    return
  }

  Book.findById(bookId).select('publisher').exec(function (error, book) {
    const response = {
      status: 200,
      message: book
    }
    if (error) {
      const msg = { message: `Error occures finding publisher with id: ${publisherId} for book with id: ${bookId}` }
      console.log(msg)
      response.status = 500
      response.message = msg
    }
    else if (!book) {
      const msg = { message: `Publisher with id ${publisherId} not available for this book` }
      console.log(msg)
      response.status = 404
      response.message = msg
    }
    if (book) {
      _getOnePublisher(req, res, book)
    } else {
      res.status(response.status).json(response.message)
    }
  })
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne
}