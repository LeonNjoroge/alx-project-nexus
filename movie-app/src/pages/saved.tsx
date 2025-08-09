import { withAuth } from "@/services/withAuth";
import { supabaseAdmin } from "@/services/supabase/admin";
import { fetchMovieDetails } from "@/pages/api/tmbd";
import type { Movie } from "@/interfaces/interface";
import {Session} from "next-auth";
import MovieCard from "@/components/MovieCard";

type SavedProps = { session: Session; savedMovies: Movie[] };

export const getServerSideProps = withAuth<SavedProps>(async (_ctx, session) => {
    // 1) read IDs from Supabase using the server-known user id
    const { data, error } = await supabaseAdmin
        .from("saved_movies")
        .select("movie_id")
        .eq("user_id", session.user!.id) // session is guaranteed by withAuth
        .order("created_at", { ascending: false });

    if (error) {
        console.error("saved.tsx Supabase error:", error.message);
        return { props: { session, savedMovies: [] } };
    }

    const ids = Array.from(new Set((data ?? []).map(r => Number(r.movie_id)).filter(Boolean)));

    // 2) enrich from TMDB (sequential for simplicity; you can parallelize if you like)
    const savedMovies: Movie[] = [];
    for (const id of ids) {
        try {
            const m = await fetchMovieDetails(String(id));
            if (m) savedMovies.push(m);
        } catch {
        }
    }

    return { props: { session, savedMovies } };
});

export default function Saved({ savedMovies }: { savedMovies: Movie[] }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Favourited Movies</h1>
            {savedMovies.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {savedMovies.map((m) => <MovieCard key={m.id} {...m} />)}
                </div>
            ) : (
                <p className="text-[var(--app-muted)]">You havent saved any movies yet.</p>
            )}
        </div>
    );
}