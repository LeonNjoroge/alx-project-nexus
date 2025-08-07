import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchMovies } from "@/pages/api/tmbd";
import { Movie } from "@/interfaces/interface";
import MovieCard from "../components/MovieCard";
import SearchBar from "@/components/SearchBar";

export default function Search() {
    const router = useRouter();
    const qParam = router.query.q;
    const q = Array.isArray(qParam) ? qParam[0] : qParam || "";

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (q) {
            setLoading(true);
            fetchMovies(q)
                .then((data) => setMovies(data.results))
                .finally(() => setLoading(false));
        }
    }, [q]);

    return (
        <div className="px-4 py-6">
            <SearchBar />
            <h1 className="text-xl font-semibold mb-4 mt-4">
                {q ? `Results for: ${q}` : "Popular Movies"}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {loading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-[342px] bg-[var(--app-surface)] rounded animate-pulse"
                        />
                    ))
                ) : movies.length > 0 ? (
                    movies.map((m) => <MovieCard key={m.id} {...m} />)
                ) : (
                    <p className="col-span-full text-[var(--app-muted)]">No movies found.</p>
                )}
            </div>
        </div>
    );
}
