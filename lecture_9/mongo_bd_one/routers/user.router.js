import express from "express";
import multer from 'multer';
import { getUsers, me, storeUser, updateUser } from "../controllers/user.controller.js";
import { allowRoles, auth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();
const upload = multer();

userRouter.use(auth); // Apply auth middleware to all routes below
userRouter.get('/me',  me)
userRouter.get('/', getUsers);
userRouter.post('/store',upload.none(), allowRoles(['admin']), storeUser);
userRouter.put(
    "/update/:id",
    upload.none(),
    allowRoles(["admin"]),
    updateUser
);

export default userRouter;