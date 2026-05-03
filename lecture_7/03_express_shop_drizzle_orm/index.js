import express from "express";
import userRouter from "./routes/users.route.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/users', userRouter)

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));