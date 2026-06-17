import { z } from "zod";
import db from "../src/index.js";
import { usersModel } from "../models/user.model.js";
import { and, eq, ne } from "drizzle-orm";


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

export const loginUserSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
}).superRefine(async (data, ctx) => {
    const [existingUser] = await db
        .select()
        .from(usersModel)
        .where(eq(usersModel.email, data.email))
        .limit(1);

    if (!existingUser) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: "User with this email does not exist",
        });
        return;
    }

    // Here you would typically hash the password and compare it with the stored one
    // For simplicity, we're assuming the password is correct
});


export const userSchema = z
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

    
export const updateUserSchema = (userId) => {
    return z
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
                .min(6, "Password must be at least 6 characters")
                .optional(),

            role: z.enum(["admin", "user"]),
        })
        .superRefine(async (data, ctx) => {
            const [existingUser] = await db
                .select()
                .from(usersModel)
                .where(
                    and(
                        eq(usersModel.email, data.email),
                        ne(usersModel.id, userId)
                    )
                )
                .limit(1);

            if (existingUser) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["email"],
                    message: "Email is already in use",
                });
            }
        });
};