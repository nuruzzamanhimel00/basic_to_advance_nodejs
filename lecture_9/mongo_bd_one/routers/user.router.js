import express from "express";
import multer from 'multer';
import { getUsers, me, storeUser } from "../controllers/user.controller.js";
import { allowRoles, auth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();
const upload = multer();

userRouter.use(auth); // Apply auth middleware to all routes below
userRouter.get('/me',  me)
userRouter.get('/', getUsers);
userRouter.post('/store',upload.none(), allowRoles(['admin']), storeUser);

export default userRouter;