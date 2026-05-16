import express from "express";

import multer from 'multer';
import {createUser, loginUser} from "../controller/user.controller.js";

const userRouter = express.Router();
const upload = multer();

userRouter.post('/register', upload.none(), createUser)
userRouter.post('/login', upload.none(), loginUser)


export default userRouter;