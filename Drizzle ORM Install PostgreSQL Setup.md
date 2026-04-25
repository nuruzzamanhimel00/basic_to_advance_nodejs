# 🚀 Drizzle ORM + PostgreSQL (Local Setup Guide)

This guide will help you set up **Drizzle ORM with PostgreSQL** locally using **Node.js (JavaScript)**.

---

## 📦 Tech Stack

* Node.js
* Drizzle ORM
* PostgreSQL
* pgAdmin 4
* dotenv

---

## ⚙️ Prerequisites

Make sure you have:

* PostgreSQL installed and running (via Laragon or standalone)
* pgAdmin 4 installed
* A database created (e.g., `test_db`)

---

## 📁 Project Setup

### 1. Create Project

```bash
mkdir drizzle-app
cd drizzle-app
npm init -y
```

---

### 2. Install Dependencies

```bash
npm install drizzle-orm pg dotenv
npm install -D drizzle-kit tsx @types/pg
```

---

## 🗂️ Folder Structure

```
drizzle-app/
│
├── drizzle/
├── src/
│   ├── db/
│   │   └── schema.js
│   └── index.js
│
├── .env
├── drizzle.config.js
├── package.json
```

---

## 🔐 Environment Setup

Create `.env` file:

```env
exp: postgres://<user>:<password>@<host>:<port>/<database>
DATABASE_URL=postgresql://postgres:root@localhost:5432/nodejs_orm

```

### 📌 Notes:

* `postgres` = default username
* `password` = your PostgreSQL password
* `test_db` = your database name

---

## ⚙️ Drizzle Config

Create `drizzle.config.js`:

```js
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

---

## 🔌 Database Connection

Create `src/index.js`:

```js
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);

export default db;
```

---

## 🧱 Define Schema

Create `src/db/schema.js`:

```js
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  age: integer("age"),
});
```

---

## 🛠️ Run Migration (Create Table)

```bash
npx drizzle-kit push
```

---

## 🧪 Test Query

Update `src/index.js`:

```js
import db from './index.js';
import { users } from './db/schema.js';

async function main() {
  await db.insert(users).values({
    name: "Himel",
    age: 25
  });

  const data = await db.select().from(users);
  console.log(data);
}

main();
```

Run:

```bash
node src/index.js
```

---

## 📊 pgAdmin Connection Info

| Field    | Value         |
| -------- | ------------- |
| Host     | localhost     |
| Port     | 5432          |
| Username | postgres      |
| Password | your password |

---

## ⚠️ Common Issues

* ❌ Wrong DATABASE_URL
* ❌ PostgreSQL not running
* ❌ Wrong port (default: 5432)
* ❌ Incorrect password

---

## 💡 Pro Tips

Use connection pooling for better performance:

```js
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });
```

---

## 🎯 Summary

1. Install dependencies
2. Setup `.env`
3. Create config file
4. Define schema
5. Run migration
6. Execute queries

---

## 🚀 Next Steps

* Build CRUD API (Express / Next.js)
* Learn migrations vs push
* Integrate with frontend (React / Next.js)

---

Happy Coding! 🎉
