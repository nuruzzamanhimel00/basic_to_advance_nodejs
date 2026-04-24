import db from './src/index.js';
import { usersSchema } from './src/db/schema.js';


async function main() {
  await db.insert(usersSchema).values({
    name: "Himel",
    age: 25
  });

  const data = await db.select().from(usersSchema);
  console.log(data);
}

main();