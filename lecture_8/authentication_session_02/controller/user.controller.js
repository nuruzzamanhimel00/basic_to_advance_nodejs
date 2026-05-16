import db from '../src/index.js';
import { userSession, usersTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { generateToken } from '../utils/jwt.js';
import { hashPassword, randomSalt } from './auth.controller.js';

export const storeUser = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }
        const [existingUser] = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        const result = await db.insert(usersTable)
        .values({
            name,
            email,
            password: hashPassword(password, randomSalt()),
            role
        }).returning();
        
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while storing user",
            error: error.message
        });
    }

}