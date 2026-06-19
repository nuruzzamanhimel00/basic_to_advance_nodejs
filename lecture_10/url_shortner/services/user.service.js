import { eq } from "drizzle-orm";
import db from "../src/index.js";
import { usersModel } from "../models/user.model.js";

export const getUserByEmail = async (email) => {
    return await db.select().from(usersModel)
        .where(eq(usersModel.email, email));

}

export const insertUser = async (userData) => {
    return await db.insert(usersModel)
        .values(userData).returning();
    
}

export const getAllUsers = async () =>{
    return await db.select().from(usersModel);
}

export const createUser = async (userData) => {
    return await db.insert(usersModel)
        .values(userData).returning();
}

export const getUserById = async (id) => {
    return await db.select().from(usersModel)
        .where(eq(usersModel.id, id));
}

export const updateUserById = async (id, userData) => {
    return await db.update(usersModel)
        .set(userData)
        .where(eq(usersModel.id, id))
        .returning();
}

export const deleteUserById = async (id) => {
    return await db.delete(usersModel)
        .where(eq(usersModel.id, id))
        .returning();
}