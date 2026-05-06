import express from "express";
import { createUser, deleteUser, getUserBooks, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";
import multer from 'multer';

const userRouter = express.Router();
const upload = multer();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/',upload.none(), createUser);

userRouter.delete('/delete/:id', deleteUser);

userRouter.put('/:id', upload.none(), updateUser);

userRouter.get('/:id/books', getUserBooks);

export default userRouter;