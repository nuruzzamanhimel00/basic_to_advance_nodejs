
import db from '../src/index.js';
import { usersModel } from '../models/user.model.js';
import { hashPassword, randomSalt } from '../utils/helper.js';
import { eq } from 'drizzle-orm';

export const registerUser = async (req, res) => {

    try{
        const { name, email, password, role } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Name, email and password are required'
            });
        }

        // Check if user already exists
        const [existingUser] = await db.select().from(usersModel)
        .where(eq(usersModel.email, email));
        if (existingUser) {
            return res.status(400).json({
                error: 'User with this email already exists'
            });
        }
        const hashedPassword = hashPassword(password, randomSalt());
        // Create new user
        const [newUser] = await db.insert(usersModel).values({ name, email, password: hashedPassword, role ,created_by: null, updated_by: null}).returning();
        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}