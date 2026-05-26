import User from "../models/User.js";

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
        const users = await User.find(); // Fetch all users from the database
        return res.json({
            success: true,
            users: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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