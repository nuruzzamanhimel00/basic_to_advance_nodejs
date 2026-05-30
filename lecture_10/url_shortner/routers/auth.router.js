import express from "express";

import multer from 'multer';
import { registerUser } from "../controllers/auth.controller.js";


const authRouter = express.Router();
const upload = multer();

// //Auth 
authRouter.post('/register', upload.none(), registerUser)

export default authRouter;