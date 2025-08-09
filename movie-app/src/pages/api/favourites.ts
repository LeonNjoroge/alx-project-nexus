import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { supabaseAdmin } from "@/services/supabase/admin";
import {fetchMovieDetails} from "@/pages/api/tmbd";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    if (req.method === "POST") {
        const { movieId } = req.body as { movieId?: number };
        if (!movieId) return res.status(400).json({ error: "movieId required" });

        const { data: existing, error: exErr } = await supabaseAdmin
            .from("saved_movies")
            .select("id")
            .eq("user_id", userId)
            .eq("movie_id", movieId)
            .limit(1);

        if (exErr) return res.status(500).json({ error: exErr.message });

        if (!existing?.length) {
            const { error } = await supabaseAdmin
                .from("saved_movies")
                .insert({ user_id: userId, movie_id: movieId });
            if (error) return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ ok: true });
    }

    if (req.method === "GET") {
        // 1) read IDs from Supabase
        const { data, error } = await supabaseAdmin
            .from("saved_movies")
            .select("movie_id")
            .eq("user_id", userId) // userId can be string; Supabase will coerce, but this is fine
            .order("created_at", { ascending: false });

        if (error) return res.status(500).json({ error: error.message });

        const ids = Array.from(
            new Set((data || []).map((r) => Number(r.movie_id)).filter(Boolean))
        );

        // Quick debug: allow IDs-only
        if (req.query.idsOnly === "1") {
            return res.status(200).json(ids);
        }

        if (ids.length === 0) {
            return res.status(200).json([]); // none saved
        }

        // 2) Enrich from TMDB in parallel using your helper
        const results = await Promise.allSettled(ids.map((id) => fetchMovieDetails(String(id))));

        type MovieDetail = Awaited<ReturnType<typeof fetchMovieDetails>>;

        const movies: MovieDetail[] = results.reduce<MovieDetail[]>((acc, r) => {
            if (r.status === "fulfilled" && r.value) {
                acc.push(r.value as MovieDetail);
            }
            return acc;
        }, []);


        return res.status(200).json(movies);
    }

    if (req.method === "DELETE") {
        const { movieId } = req.body as { movieId?: number };
        if (!movieId) return res.status(400).json({ error: "movieId required" });

        const { error } = await supabaseAdmin
            .from("saved_movies")
            .delete()
            .eq("user_id", userId)
            .eq("movie_id", movieId);

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
