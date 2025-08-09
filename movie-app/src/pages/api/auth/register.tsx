import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import {supabaseAdmin} from "@/services/supabase/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    try {
        const { data: existing, error: exErr } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("username", username)
            .maybeSingle();

        if (exErr) return res.status(500).json({ message: exErr.message });
        if (existing) return res.status(409).json({ message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);

        const { error } = await supabaseAdmin
            .from("users")
            .insert({ username, password_hash: hash });

        if (error) return res.status(500).json({ message: error.message });

        return res.status(201).json({ message: "User created successfully" });
    } catch (e: unknown) {
        const message =
            e instanceof Error ? e.message : typeof e === "string" ? e : JSON.stringify(e);

        console.error("Error:", e);
        return res.status(500).json({ message });
    }
}
