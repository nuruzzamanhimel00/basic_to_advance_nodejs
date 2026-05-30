import express from "express";

import multer from 'multer';
import { registerUser } from "../controllers/auth.controller";


const userRouter = express.Router();
const upload = multer();

// //Auth 
// userRouter.post('/register', upload.none(), registerUser)

export default userRouter;