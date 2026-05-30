
import db from '../src/index.js';
import { usersModel } from '../models/user.model.js';
import { hashPassword, randomSalt, verifyPassword } from '../utils/helper.js';
import { eq } from 'drizzle-orm';
import { generateToken } from '../../../lecture_8/authentication_session_02/utils/jwt.js';

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

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // Check if user exists
        const [user] = await db.select().from(usersModel)
        .where(eq(usersModel.email, email));
        if (!user) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
          // Verify password
        const isPasswordCorrect = await verifyPassword(
            password,
            user.password
        );
         // Wrong password
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = generateToken(user);
        // const { password: _, ...safeUser } = user;
        const {
            password: _,
            // name: __,
            // email: ___,
            // role: ____,
            ...safeUser
            } = user;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: safeUser
        });
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}