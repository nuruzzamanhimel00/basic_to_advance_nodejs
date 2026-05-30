import jwt from "jsonwebtoken";
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET; // put in .env in real project

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};