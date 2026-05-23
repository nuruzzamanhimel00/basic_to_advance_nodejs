// connection.js
import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // এগুলো অপশনাল কিন্তু ভালো
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        process.exit(1);
    }
};