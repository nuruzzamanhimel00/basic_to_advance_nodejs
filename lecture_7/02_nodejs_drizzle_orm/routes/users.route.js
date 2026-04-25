import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.delete('/delete/:id', deleteUser);

router.post('/:id/update', updateUser);


export default router;