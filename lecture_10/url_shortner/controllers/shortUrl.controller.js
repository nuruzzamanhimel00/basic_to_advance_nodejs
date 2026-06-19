import db from "../src/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { shortUrlSchema } from "../validation/shortUrl.validation.js";
import { nanoid } from "nanoid";
import { shortUrlsModel } from "../models/shortUrl.model.js";

export const storeShortUrl = async (req, res) => {
    try {
        // const user = req.user;
        // console.log('req.body', req);
         // Validate request body
        const validationResult =
            await shortUrlSchema.safeParseAsync({
                original_url: req.body.original_url,
                short_code: req.body.short_code,
                user_id: req.user.id,
            });
        if (!validationResult.success) {
            // console.log('validationResult',validationResult.error.issues);
            return res.status(400).json({
                error: validationResult.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message
                }))
            });
        }
    const { short_code } = validationResult.data;
    const shortCode = short_code || nanoid(5);
    //store in database
        await db.insert(shortUrlsModel)
        .values({ ...validationResult.data, short_code: shortCode })
        .returning();

        return res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            data: { ...validationResult.data, short_code: shortCode }
        });
        
     
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
     }

}
