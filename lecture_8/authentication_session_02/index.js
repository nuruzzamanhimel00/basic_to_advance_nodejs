import express from "express";
import 'dotenv/config';
import userRouter from "./router/user.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/users', userRouter)

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));