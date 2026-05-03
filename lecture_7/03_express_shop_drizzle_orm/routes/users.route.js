import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.delete('/delete/:id', deleteUser);

userRouter.post('/:id/update', updateUser);


export default userRouter;