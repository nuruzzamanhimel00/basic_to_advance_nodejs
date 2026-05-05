import db from '../src/index.js';
import { booksSchema } from '../models/book.model.js';
import { eq , ilike} from 'drizzle-orm';
import { usersSchema } from '../models/user.model.js';
import { sql } from "drizzle-orm";

export const getBooks = async (req, res) => {
  try {
    const search = req.query.search;
    if(search) {
      // ✅ Format search query: convert "word1 word2" to "word1 & word2" for tsquery
      const searchQuery = search.trim().split(/\s+/).join(' & ');
      
      // ✅ Use GIN full-text search index on title (much faster for large datasets)
      const data = await db
        .select()
        .from(booksSchema)
        .where(sql`to_tsvector('english', title) @@ to_tsquery('english', ${searchQuery})`);
        return res.json(data);
    }
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
        const { title, description, price, user_id } = req.body || {};

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

export const deleteBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'id must be a number' });
        }
        const result = await db
            .delete(booksSchema)
            .where(eq(booksSchema.id, id))
            .returning();
        if (result.length === 0) {
            return res.status(404).json({ error: `Book with id ${id} not found` });
        }
        return res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'id must be a number' });
        }

        const { title, description, price, user_id } = req.body || {};
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (user_id !== undefined) updateData.user_id = user_id;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'At least one field (title, description, price, user_id) is required to update' });
        }

  
                // ✅ Update
        const result = await db
        .update(booksSchema)
        .set(updateData)
        .where(eq(booksSchema.id, id))
        .returning();


        if (result.length === 0) {
            return res.status(404).json({ error: `Book with id ${id} not found` });
        }

          // ✅ Fetch with user (clean structure)
        const updatedBook = await db
            .select()
            .from(booksSchema)
            .leftJoin(usersSchema, eq(booksSchema.user_id, usersSchema.id))
            .where(eq(booksSchema.id, id))
            .limit(1);

        return res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
