import express from "express";

import multer from 'multer';
import {createUser, loginUser} from "../controller/user.controller.js";
import { userSession } from "../models/user.model.js";
import { authUserCheck } from "../middleware/auth.middleware.js";

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


export default userRouter;