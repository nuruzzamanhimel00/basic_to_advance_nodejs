import db from '../src/index.js';
import { usersSchema } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
import { booksSchema } from '../models/book.model.js';

// ✅ Get All Users
export const getUsers = async (req, res) => {
  try {
    const data = await db.select().from(usersSchema);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get User By ID
export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'id must be a number' });
    }

    const user = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, id));

    if (user.length === 0) {
      return res.status(404).json({
        error: `User with id ${id} does not exist!`,
      });
    }

    res.json(user[0]); // ⚠️ array থেকে first item
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Create User
export const createUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    // Basic validation
    if (!name || !age || !email) {
      return res
        .status(400)
        .json({ error: 'name and age are required' });
    }

    const result = await db
      .insert(usersSchema)
      .values({ name, age, email })
      .returning();

    res.status(201).json(result[0]); // created user return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'id must be a number' });
    }

    const result = await db
      .delete(usersSchema)
      .where(eq(usersSchema.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({
        error: `User with id ${id} not found`,
      });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Update User
export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // console.log('Updating user with id:', id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'id must be a number' });
    }

    const { name, age, email } = req.body;

    if (!name && !age && !email) {
      return res.status(400).json({
        error: 'At least one field (name or age or email) is required',
      });
    }

    const [result] = await db
      .update(usersSchema)
      .set({ name, age, email })
      .where(eq(usersSchema.id, id))
      .returning();
    console.log('Update result:', result);

    if (!result) {
      return res.status(404).json({
        error: `User with id ${id} not found`,
      });
    }

    return res.json(result); // updated user return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

export const getUserBooks = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'id must be a number' });
        }

          const userWithBooks = await db
          .select()
          .from(usersSchema)
          .leftJoin(booksSchema, eq(usersSchema.id, booksSchema.user_id))
          .where(eq(usersSchema.id, id));

        if (userWithBooks.length === 0) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
    
        res.json(userWithBooks);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}