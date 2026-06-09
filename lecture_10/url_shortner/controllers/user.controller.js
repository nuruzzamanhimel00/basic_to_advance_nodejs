import db from "../src/index.js";
import { usersModel } from '../models/user.model.js';
import { hashPassword, randomSalt } from "../utils/helper.js";
import { eq } from "drizzle-orm";

export const getUsers = async (req, res) => {
  try {
    const data = await db.select().from(usersModel);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const storeUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const [existingUser] = await db.select()
        .from(usersModel)
        .where(eq(usersModel.email, email));
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

         const result = await db.insert(usersModel)
        .values({
            name,
            email,
            password: hashPassword(password, randomSalt()),
            role,
            created_by: req.user.id,
            updated_by: null,
        }).returning();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: result
        });
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
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
        .from(usersModel)
        .where(eq(usersModel.id, id));
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
        const result = await db.update(usersModel)
        .set(updatedUser)
        .where(eq(usersModel.id, id))
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

export const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }
        const [existingUser] = await db.select()
        .from(usersModel)
        .where(eq(usersModel.id, id));
        if(!existingUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        await db.delete(usersModel)
        .where(eq(usersModel.id, id));
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting user",
            error: error.message
        });
    }
}