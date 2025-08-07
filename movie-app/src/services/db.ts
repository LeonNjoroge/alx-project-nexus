import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function openDB() {
    const db = await open({
        filename: path.resolve(process.cwd(), "database.sqlite"),
        driver: sqlite3.Database,
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

    return db;
}