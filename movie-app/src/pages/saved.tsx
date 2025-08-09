import { withAuth } from "@/services/withAuth";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/interfaces/interface";

export const getServerSideProps = withAuth(async (ctx, session) => {
    const base = process.env.NEXT_PUBLIC_APP_URL || `http://${ctx.req.headers.host}`;
    const res = await fetch(`${base}/api/favourites`, {
        headers: { cookie: ctx.req.headers.cookie || "" },
    });

    const savedMovies: Movie[] = res.ok ? await res.json() : [];
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
                <p className="text-[var(--app-muted)]">You haven’t saved any movies yet.</p>
            )}
        </div>
    );
}

