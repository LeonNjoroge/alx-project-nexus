import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { openDB } from "@/services/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    try {
        const db = await openDB();

        const existing = await db.get("SELECT * FROM users WHERE username = ?", username);
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run("INSERT INTO users (username, password) VALUES (?, ?)", username, hashedPassword);

        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
