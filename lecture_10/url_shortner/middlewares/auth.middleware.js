import { verifyToken } from "../../../lecture_8/authentication_session_02/utils/jwt.js";


export const authMiddleware = (req, res, next) => {

    try{
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
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

export const restrictToRoles = (roles) => {
       return async (req, res, next) => {
        try {
            const user = await req.user;
            // console.log('----user',user)
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Access denied",
                });
            }
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
    };

}