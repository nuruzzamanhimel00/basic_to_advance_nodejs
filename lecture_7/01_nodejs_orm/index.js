// index.js - Main file to test Drizzle ORM
import 'dotenv/config';
import { db, pool } from './src/db/index.js';
import { users, posts, comments } from './src/db/schema.js';
import { eq } from 'drizzle-orm';

async function main() {
  try {
    // CREATE - Insert a new user
    console.log('Creating a new user...');
    const newUser = await db.insert(users).values({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password_123',
    }).returning();
    console.log('User created:', newUser);

    // READ - Get all users
    console.log('\nFetching all users...');
    const allUsers = await db.select().from(users);
    console.log('All users:', allUsers);

    // UPDATE - Update a user
    console.log('\nUpdating user...');
    const updatedUser = await db
      .update(users)
      .set({ name: 'Jane Doe' })
      .where(eq(users.id, 1))
      .returning();
    console.log('User updated:', updatedUser);

    // DELETE - Delete a user
    console.log('\nDeleting user...');
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, 1))
      .returning();
    console.log('User deleted:', deletedUser);

    console.log('\n✅ All operations completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

main();