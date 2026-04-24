# Drizzle ORM Setup with PostgreSQL - Complete Guide

## ✅ Setup Complete!

### 📋 What We've Done:

1. **Installed Dependencies** ✓
   - `drizzle-orm` - ORM library
   - `drizzle-kit` - Migration tool
   - `pg` - PostgreSQL driver
   - `dotenv` - Environment variables
   npm install drizzle-orm pg dotenv
   npm install -D drizzle-kit

2. **Created Configuration Files** ✓
   - `.env` - Database connection string
   - `drizzle.config.js` - Drizzle configuration
   - `src/db/schema.js` - Database schema (users, posts, comments tables)
   - `src/db/index.js` - Database connection setup

3. **Created Example Files** ✓
   - `index.js` - CRUD operations example
   - `src/db/queries.js` - Reusable query functions

---

## 🚀 Quick Start Steps:

### Step 1: Verify PostgreSQL
Make sure PostgreSQL is running on your machine (port 5432)

### Step 2: Create Database
```sql
CREATE DATABASE nodejs_orm;
```

### Step 3: Update .env (if needed)
Edit `.env` file with your PostgreSQL credentials:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/nodejs_orm
```

### Step 4: Generate & Run Migrations
```bash
npm run db:generate    # Creates migration files
npm run db:migrate     # Applies migrations to database
```

### Step 5: Test the Setup
```bash
node index.js
```

---

## 📝 Common Drizzle ORM Commands

### CREATE
```javascript
import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';

const newUser = await db.insert(users).values({
  name: 'John',
  email: 'john@example.com',
  password: '123456'
}).returning();
```

### READ
```javascript
// Get all users
const allUsers = await db.select().from(users);

// Get specific user
const user = await db.select().from(users).where(eq(users.id, 1));
```

### UPDATE
```javascript
const updated = await db
  .update(users)
  .set({ name: 'Jane' })
  .where(eq(users.id, 1))
  .returning();
```

### DELETE
```javascript
const deleted = await db
  .delete(users)
  .where(eq(users.id, 1))
  .returning();
```

---

## 🔧 Available npm Scripts

```bash
npm run db:generate    # Generate migration files
npm run db:migrate     # Run pending migrations
npm run db:studio      # Open Drizzle Studio (visual DB editor)
```

---

## 📚 Project Structure

```
01_nodejs_orm/
├── .env                    # Environment variables
├── drizzle.config.js       # Drizzle configuration
├── package.json            # Project dependencies
├── index.js                # Example CRUD operations
├── drizzle/                # Auto-generated migrations
└── src/
    └── db/
        ├── index.js        # Database connection
        ├── schema.js       # Table definitions
        └── queries.js      # Reusable query functions
```

---

## 🎯 Next Steps

1. Modify `src/db/schema.js` to add your own tables
2. Run `npm run db:generate` to create new migrations
3. Update `src/db/queries.js` with your custom queries
4. Import and use queries in your Express routes or other files

---

## 💡 Tips

- Always use `.returning()` to get the inserted/updated record
- Use `eq()`, `and()`, `or()` from drizzle-orm for WHERE clauses
- Use `async/await` for all database operations
- Always close the pool connection when done: `await pool.end()`

---

## 🐛 Troubleshooting

**Connection Error?**
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Make sure database exists

**Migration Errors?**
- Delete `drizzle/` folder and run `npm run db:generate` again
- Check schema.js for syntax errors

**Port Already in Use?**
- Change PostgreSQL port in .env if needed

---

Happy coding! 🎉
