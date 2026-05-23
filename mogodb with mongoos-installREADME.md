# Express + MongoDB (Mongoose) Setup

## Install Dependencies

``` bash
npm install express mongoose dotenv
```

## Project Structure

``` bash
project/
│── node_modules/
│── src/
│   ├── index.js
│   └── config/
│       └── db.js
│── .env
│── package.json
```

## Environment File

### Local MongoDB

``` env
MONGO_URI=mongodb://127.0.0.1:27017/mydb
PORT=3000
```

### MongoDB Atlas

``` env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mydb
PORT=3000
```

## Database Connection

**src/config/db.js**

``` js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
    } catch (error) {
        console.log("DB Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
```

## Express Server

**src/index.js**

``` js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
```

## package.json

``` json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js"
  }
}
```

Run:

``` bash
npm run dev
```
