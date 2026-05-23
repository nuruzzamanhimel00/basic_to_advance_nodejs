import express from "express";
import 'dotenv/config';

import {connectDB} from "./connection.js";

const app = express();

// middleware
app.use(express.json());

// connect mongodb
connectDB()
    .then(() => {
        console.log("DB Connected, Starting Server...");
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("DB Connection Error:", error.message);
        process.exit(1);
    });

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});