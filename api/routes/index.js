/**
 * express routes
 * auth: tdessalegn
 */
const express = require('express')
const router = express.Router()

const bookController = require('../controllers/books.controllers')
const publisherController = require('../controllers/publishers.controllers')

router.route('/books')
  .get(bookController.getAll)
  .post(bookController.addOne)

router.route('/books/:bookId')
  .get(bookController.getOne)
  .delete(bookController.deleteOne)
  .put(bookController.updateOne)

router.route('/books/:bookId/publishers')
  .get(publisherController.getAll)
  .post(publisherController.addOne)

router.route('/books/:bookId/publishers/:publisherId')
  .get(publisherController.getOne)
  .delete(publisherController.deleteOne)
  .put(publisherController.updateOne)

module.exports = router
