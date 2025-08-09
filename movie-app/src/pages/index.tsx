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
    const loadedPages = useRef<Set<number>>(new Set()); // prevent double fetches

    const maxRequests = 15;
    const requestCount = useRef(0);

    const loadMore = useCallback(async () => {
        if (
            loading ||
            !hasMore ||
            loadedPages.current.has(page) ||
            requestCount.current >= maxRequests
        ) return;

        loadedPages.current.add(page);
        requestCount.current += 1; // increment the request count

        setLoading(true);
        try {
            const data = await fetchMovies("", page);
            const results: Movie[] = data?.results ?? [];

            if (results.length === 0) {
                setHasMore(false);
                return;
            }

            setMovies(prev => {
                const map = new Map<number, Movie>(prev.map(m => [m.id, m]));
                for (const m of results) map.set(m.id, m);
                return Array.from(map.values());
            });

            setPage(prev => prev + 1);
        } catch (err) {
            console.error("Failed to load more movies:", err);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, page]);

    // Observe sentinel
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) loadMore();
            },
            { root: null, rootMargin: "400px 0px", threshold: 0 } // trigger earlier
        );
        const el = observerRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [loadMore]);

    // Initial load
    useEffect(() => { void loadMore(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <SearchBar />
            <h2 className="text-lg font-bold mt-6 mb-3">Latest Movies</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map(m => (
                    <MovieCard key={m.id} {...m} />
                ))}
            </div>

            {/* Infinite scroll sentinel */}
            <div ref={observerRef} className="h-10 mt-10">
                {loading && <p className="text-center text-[var(--app-muted)]">Loading more...</p>}
                {!hasMore && <p className="text-center text-[var(--app-muted)]">No more movies.</p>}
            </div>
        </div>
    );
}
