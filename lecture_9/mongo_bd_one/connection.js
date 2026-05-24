// connection.js
import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME || 'mongo_db_one', // ← This creates/selects new DB
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        // console.log(`✅ MongoDB Connected! Database: ${conn.connection.db.databaseName}`);
        return conn;
    } catch (error) {
        console.error("❌ DB Connection Error:", error.message);
        process.exit(1);
    }
};