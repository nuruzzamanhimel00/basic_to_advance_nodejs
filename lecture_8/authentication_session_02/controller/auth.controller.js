import db from '../src/index.js';
import { userSession, usersTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { generateToken } from '../utils/jwt.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // console.log(name, email, password, role);

        // Check existing user
        const [existingUser] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (existingUser) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }
        const salt = randomSalt();
        const hashedPassword = hashPassword(password, salt);
        // Create user
        const [newUser] = await db
            .insert(usersTable)
            .values({
                name,
                email,
                password: hashedPassword,
                role
            })
            .returning();

        return res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user by email
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        // User not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
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
        // // Create session
        // const session_token = crypto.randomBytes(16).toString('hex');
        // const [session] = await db
        //     .insert(userSession)
        //     .values({
        //         userId: user.id,
        //         sessionToken: session_token,
        //         createdAt: Math.floor(Date.now() / 1000),
        //     })
        //     .returning();
        const token = generateToken(user);

        // Remove password from response
        const { password: _, ...safeUser } = user;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: safeUser,
            token,
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const randomSalt = () => {
    return crypto.randomBytes(16).toString('hex');
}

export const hashPassword = (password, salt) => {
    const hashedPassword =cryptMakeAHash(password, salt);

    return `${salt}:${hashedPassword}`;
};

export const verifyPassword = (password, storedPassword) => {
    const [salt, originalHash] = storedPassword.split(':');
    const hash = cryptMakeAHash(password, salt);
    return hash === originalHash;
};

export const cryptMakeAHash = (password, salt) => {
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    return hash;
}

