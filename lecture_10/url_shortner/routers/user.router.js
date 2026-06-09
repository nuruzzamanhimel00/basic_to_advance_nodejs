import express from "express";

import multer from 'multer';
import { authMiddleware, restrictToRoles } from "../middlewares/auth.middleware.js";
import { deleteUser, getUsers, storeUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();
const upload = multer();

userRouter.use(authMiddleware); // Apply auth middleware to all routes below
//Me
userRouter.get('/me', async (req, res) => {
    return res.json({
        success: true,
        user: req.user
    });
})
userRouter.get('/', getUsers);

userRouter.post('/store', upload.none(),
restrictToRoles(['admin']),
 storeUser)

 userRouter.put('/update/:id', upload.none(),
restrictToRoles(['admin']),
 updateUser)
 userRouter.delete('/delete/:id', upload.none(),
restrictToRoles(['admin']),
 deleteUser)


export default userRouter;