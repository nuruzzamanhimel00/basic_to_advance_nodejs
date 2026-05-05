import express from "express";
import { createBook, getBookById, getBooks } from "../controllers/book.controller.js";

const bookRouter = express.Router();

bookRouter.get('/', getBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/', createBook);

export default bookRouter;