import db from "../src/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { shortUrlRequest } from "../validation/shortUrl.validation.js";
import { nanoid } from "nanoid";
import { shortUrlsModel } from "../models/shortUrl.model.js";
import { insertShortUrl } from "../services/shortUrl.service.js";

export const storeShortUrl = async (req, res) => {
    try {
        // const user = req.user;
        // console.log('req.body', req);
         // Validate request body
        const validationResult =
            await shortUrlRequest.safeParseAsync({
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
    await insertShortUrl({ ...validationResult.data, short_code: shortCode })
      

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

export const getShortUrl = async (req, res) => {
    try {
        const { short_code } = req.params;
        const user = req.user;
        const [shortUrl] = await db.select().from(shortUrlsModel)
            .where(and(
                eq(shortUrlsModel.short_code, short_code),
                eq(shortUrlsModel.user_id, user.id)
            ));
        if (!shortUrl) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }
       return res.redirect(shortUrl.original_url);
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
     }
}   