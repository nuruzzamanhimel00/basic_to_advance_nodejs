const express = require('express');
const { BOOKS } = require('../models/book');
const {getAllBooks, getBookById, createBook, deleteBook} = require('../controllers/book.controller');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.post('/', createBook);

router.delete('/:id', deleteBook);

module.exports = router;
