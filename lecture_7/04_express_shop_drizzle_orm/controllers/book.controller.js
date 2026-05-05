import db from '../src/index.js';
import { booksSchema } from '../models/book.model.js';
import { eq } from 'drizzle-orm';
import { usersSchema } from '../models/user.model.js';

export const getBooks = async (req, res) => {
  try {
    const data = await db.select().from(booksSchema);
    return res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log('id', id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'id must be a number' });
        }     
        const [book] = await db
        .select()
        .from(booksSchema)
        .leftJoin(usersSchema, eq(booksSchema.user_id, usersSchema.id)) // ✅ Join with users table
        .where(eq(booksSchema.id, id)).limit(1);
        console.log('book', book);
        
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createBook = async (req, res) => {
    try {
        const { title, description, price, user_id } = req.body;

        if (!title || !description || !price || !user_id) {
            return res.status(400).json({
                error: 'title, description, price and user_id are required'
            });
        }

        // ✅ Step 1: Insert book
        const [insertedBook] = await db
            .insert(booksSchema)
            .values({ title, description, price, user_id })
            .returning();
            console.log('insertedBook', insertedBook);

        // ✅ Step 2: Fetch with user data (join)
        const [result] = await db
            .select()
            .from(booksSchema)
            .leftJoin(usersSchema, eq(booksSchema.user_id, usersSchema.id))
            .where(eq(booksSchema.id, insertedBook.id))
            .limit(1);

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};