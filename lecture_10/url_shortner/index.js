import express from "express";
import 'dotenv/config';
import authRouter from "./routers/auth.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));