import { verifyToken } from "../utils/jwt.js";

export const auth = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token",
            });
        }

        req.user = decoded; // attach user

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}

export const allowRoles =  (roles) => {
    return  (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Access denied"
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
}