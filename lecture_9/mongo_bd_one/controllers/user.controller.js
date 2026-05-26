import User from "../models/User.js";
import { hashPassword, randomSalt } from "../utils/helper.js";

export const me = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.json({
            success: true,
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .sort({ _id: -1 }); // DESC order

        return res.json({
            success: true,
            users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const storeUser = async (req, res) => {

    try{
        const { name, email, password, role } = req.body;
        const authUser = req.user;
        // console.log(authUser)
         if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        const user = await User.create({ name, email, password, role, created_by: authUser.id });

        return res.status(201).json({
            success: true,
            user: user
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
     }
}


export const updateUser = async (req, res) => {
    try {
        const id = (req.params.id);
        const { password, created_by, ...rest } = req.body;
        const updateData = {
            ...rest,
            created_by: created_by || null
        };
          // Hash password if provided
        if (password) {;
            updateData.password =  hashPassword(password, randomSalt());
        }
        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true, // return updated document
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
        // console.log('---id', updateData, id, user)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};