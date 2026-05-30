import express from "express";

import multer from 'multer';
import { loginUser, registerUser } from "../controllers/auth.controller.js";


const authRouter = express.Router();
const upload = multer();

// //Auth 
authRouter.post('/register', upload.none(), registerUser)
authRouter.post('/login', upload.none(), loginUser)

export default authRouter;