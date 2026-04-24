// src/db/queries.js - Common Drizzle ORM query examples
import { db } from './index.js';
import { users, posts, comments } from './schema.js';
import { eq, and, or, like } from 'drizzle-orm';

// CREATE OPERATIONS
export async function createUser(name, email, password) {
  const result = await db.insert(users).values({
    name,
    email,
    password,
  }).returning();
  return result[0];
}

export async function createPost(title, content, userId) {
  const result = await db.insert(posts).values({
    title,
    content,
    userId,
  }).returning();
  return result[0];
}

// READ OPERATIONS
export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getUserById(id) {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
}

export async function getUserByEmail(email) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
}

export async function searchUsers(keyword) {
  return await db
    .select()
    .from(users)
    .where(like(users.name, `%${keyword}%`));
}

export async function getAllPosts() {
  return await db.select().from(posts);
}

export async function getPostsByUserId(userId) {
  return await db.select().from(posts).where(eq(posts.userId, userId));
}

// UPDATE OPERATIONS
export async function updateUser(id, data) {
  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}

export async function updatePost(id, title, content) {
  const result = await db
    .update(posts)
    .set({
      title,
      content,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning();
  return result[0];
}

// DELETE OPERATIONS
export async function deleteUser(id) {
  const result = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}

export async function deletePost(id) {
  const result = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();
  return result[0];
}