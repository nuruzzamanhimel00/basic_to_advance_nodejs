import User from "../models/User.js";
import { hashPassword, randomSalt, verifyPassword } from "../utils/helper.js";
import { generateToken } from "../utils/jwt.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }
        //check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

           // Generate salt & hash password
        const salt = randomSalt();
        const hashedPassword = hashPassword(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({
            message: "Signup successful",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

         // Find user
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        // Verify password
        const isPasswordCorrect = verifyPassword(
            password,
            user?.password
        );

        // Wrong password
        if (!isPasswordCorrect) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });

        }

         // Generate JWT Token
        const token = generateToken(user);

        // Remove password
        const userResponse = user.toObject();

        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: userResponse,
            token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message
        });
    }

}