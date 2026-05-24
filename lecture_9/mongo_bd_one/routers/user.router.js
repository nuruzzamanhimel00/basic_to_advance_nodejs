import express from "express";
import multer from 'multer';
import { me } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();
const upload = multer();

userRouter.get('/me', auth, me)

export default userRouter;