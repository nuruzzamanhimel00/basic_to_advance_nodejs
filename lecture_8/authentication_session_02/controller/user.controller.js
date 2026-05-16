import db from '../src/index.js';
import { userSession, usersTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { generateToken } from '../utils/jwt.js';
import { hashPassword, randomSalt } from './auth.controller.js';

// ✅ Get All Users
export const getUsers = async (req, res) => {
  try {
    const data = await db.select().from(usersTable);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email, password, role } = req.body;
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }
        if(!name || !email || !role){
            return res.status(400).json({
                success: false,
                message: "Name, email and role are required"
            });
        }
        const [existingUser] = await db.select()
        .from(usersTable)
        .where(eq(usersTable.id, id));
        if(!existingUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const updatedUser = {
            name,
            email,
            role
        };
        if(password){
            updatedUser.password = hashPassword(password, randomSalt());
        }
        const result = await db.update(usersTable)
        .set(updatedUser)
        .where(eq(usersTable.id, id))
        .returning();
        return res.status(200).json({
            success: true,
            message: "User updated  successfully",
            user: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating user",
            error: error.message
        });
    }
}