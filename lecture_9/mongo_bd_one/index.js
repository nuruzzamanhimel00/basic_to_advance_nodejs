import express from "express";
import 'dotenv/config';

import {connectDB} from "./connection.js";
import authRouter from "./routers/auth.router.js";

const app = express();
// Middleware
app.use(express.json());

// Connect Database First, then Start Server
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("DB Connection Error:", error.message);
        process.exit(1);
    });

// Routes
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});