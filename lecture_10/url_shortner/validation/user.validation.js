import { z } from "zod";
import db from "../src/index.js";
import { usersModel } from "../models/user.model.js";
import { eq } from "drizzle-orm";


export const registerUserSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name cannot exceed 100 characters"),

        email: z
            .string()
            .trim()
            .email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        role: z
            .enum(["admin", "user"])
            .optional(),
    })
    .superRefine(async (data, ctx) => {
        const [existingUser] = await db
            .select()
            .from(usersModel)
            .where(eq(usersModel.email, data.email))
            .limit(1);

        if (existingUser) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["email"],
                message: "User with this email already exists",
            });
        }
    });
