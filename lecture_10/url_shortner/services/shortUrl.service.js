import { shortUrlsModel } from "../models/shortUrl.model.js";
import db from "../src/index.js";

export const insertShortUrl = async (data) =>{
    return await  db.insert(shortUrlsModel)
        .values(data)
        .returning();
}