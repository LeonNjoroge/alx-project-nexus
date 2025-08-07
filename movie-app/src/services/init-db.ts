// scripts/init-db.ts (run once manually)
import { openDB } from "@/services/db";

async function init() {
    const db = await openDB();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);
    console.log("Database initialized.");
}

init();
