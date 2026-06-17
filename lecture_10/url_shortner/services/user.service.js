import { eq } from "drizzle-orm";
import db from "../src/index.js";
import { usersModel } from "../models/user.model.js";

export const getUserByEmail = async (email) => {
    return await db.select().from(usersModel)
        .where(eq(usersModel.email, email));

}

export const insertUser = async (userData) => {
    const [createdUser] = await db.insert(usersModel)
        .values(userData).returning();
    return createdUser;
}

