import { useEffect, useState, useRef, useCallback } from "react";
import { Movie } from "@/interfaces/interface";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/pages/api/tmbd";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const data = await fetchMovies("", page); // pass empty query and current page
            if (data.results.length === 0) {
                setHasMore(false);
            } else {
                setMovies((prev) => [...prev, ...data.results]);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.error("Failed to load more movies:", err);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, page]);

    // Observe when the sentinel div is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadMore();
            },
            { threshold: 1 }
        );

        const current = observerRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [loadMore]);

    // Initial load
    useEffect(() => {
        void loadMore();
    }, []);






    return (
        <div>
            <SearchBar />
            <h2 className="text-lg font-bold mt-6 mb-3">Latest Movies</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((m) => (
                    <MovieCard key={m.id} {...m} />
                ))}
            </div>

            {/* Infinite scroll sentinel */}
            <div ref={observerRef} className="h-10 mt-10">
                {loading && <p className="text-center text-muted">Loading more...</p>}
                {!hasMore && <p className="text-center text-muted">No more movies.</p>}
            </div>
        </div>
    );
}
