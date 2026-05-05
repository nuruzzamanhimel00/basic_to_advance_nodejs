import express from "express";
import userRouter from "./routes/user.router.js";
import bookRouter from "./routes/book.router.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/users', userRouter)
app.use('/books', bookRouter)

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));