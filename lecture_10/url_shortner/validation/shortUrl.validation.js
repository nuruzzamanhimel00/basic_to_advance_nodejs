import { z } from "zod";
import db from "../src/index.js";
import { usersModel } from "../models/user.model.js";
import { and, eq, ne } from "drizzle-orm";


export const shortUrlSchema = z.object({
    original_url: z
        .string()
        .url("Please provide a valid URL"),

    short_code: z
        .string()
        .trim()
        .nullable()
        .optional(),

    user_id: z
        .number()
        .int()
        .positive("User ID must be positive"),
}).superRefine(async (data, ctx) => {
    const user = await db
        .select({ id: usersModel.id })
        .from(usersModel)
        .where(eq(usersModel.id, data.user_id))
        .limit(1);

    if (user.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["user_id"],
            message: "User does not exist",
        });
    }
});