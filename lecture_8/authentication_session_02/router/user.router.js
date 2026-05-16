import express from "express";

import multer from 'multer';

import { userSession } from "../models/user.model.js";
import { authUserCheck } from "../middleware/auth.middleware.js";
import { createUser, loginUser } from "../controller/auth.controller.js";
import { storeUser } from "../controller/user.controller.js";

const userRouter = express.Router();
const upload = multer();


userRouter.post('/register', upload.none(), createUser)
userRouter.post('/login', upload.none(), loginUser)

userRouter.get('/me', authUserCheck, async (req, res) => {
    return res.json({
        success: true,
        user: req.user
    });
})

userRouter.post('/store', upload.none(),authUserCheck,
 storeUser)


export default userRouter;