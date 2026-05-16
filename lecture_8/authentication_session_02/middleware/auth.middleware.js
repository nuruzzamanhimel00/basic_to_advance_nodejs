import { eq } from "drizzle-orm";
import { userSession, usersTable } from "../models/user.model.js";
import db from "../src/index.js";
import { verifyToken } from "../utils/jwt.js";

export const authUserCheck = (req, res, next) => {
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

        req.user = decoded; // attach user

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

// export const authUserCheck = async (req, res, next) => {
//     try {
//         const session_token = req.headers["session_token"];

//         if (!session_token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized: No session ID provided",
//             });
//         }

//         const [data] = await db
//             .select({
//                 sessionId: userSession.id,
//                 userId: userSession.userId,
//                 name: usersTable.name,
//                 email: usersTable.email,
//             })
//             .from(userSession)
//             .innerJoin(usersTable, eq(userSession.userId, usersTable.id))
//             .where(eq(userSession.sessionToken, session_token));

//         if (!data) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized: Invalid session ID",
//             });
//         }
//         // attach user to request
//         req.user = data;

//         next();
//     } catch (error) {
//         console.error("Auth middleware error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };