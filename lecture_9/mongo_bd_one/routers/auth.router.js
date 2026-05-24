import express from "express";
import multer from 'multer';
import { createUser, loginUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();
const upload = multer();

authRouter.post('/register', upload.none(), createUser);
authRouter.post('/login', upload.none(), loginUser);

export default authRouter;