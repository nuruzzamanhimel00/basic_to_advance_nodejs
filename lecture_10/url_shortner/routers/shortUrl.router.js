import express from "express";

import multer from 'multer';
import { authMiddleware, restrictToRoles } from "../middlewares/auth.middleware.js";
import { deleteUser, getUsers, storeUser, updateUser } from "../controllers/user.controller.js";
import { storeShortUrl } from "../controllers/shortUrl.controller.js";

const shortUrlRouter = express.Router();
const upload = multer();

shortUrlRouter.use(authMiddleware); // Apply auth middleware to all routes below

shortUrlRouter.post('/store', upload.none(),storeShortUrl)


export default shortUrlRouter;