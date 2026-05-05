import express from "express";
import multer from 'multer';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/book.controller.js";

const bookRouter = express.Router();
const upload = multer();

bookRouter.get('/', getBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/', upload.none(), createBook);
bookRouter.delete('/:id', deleteBook);
bookRouter.put('/:id', upload.none(), updateBook);

export default bookRouter;