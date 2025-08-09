import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { fetchMovies, fetchTopRatedMovies } from "@/pages/api/tmbd";
import type { Movie } from "@/interfaces/interface";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

export default function Search() {
    const router = useRouter();
    const qParam = router.query.q;
    const q = Array.isArray(qParam) ? qParam[0] : qParam || "";

    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const fetchedPages = useRef<Set<string>>(new Set()); // guard against double fetches

    // add these refs/constants near your other refs/state
    const MAX_REQUESTS = 15;
    const requestCount = useRef(0);

    useEffect(() => {
        setMovies([]);
        setPage(1);
        setHasMore(true);
        fetchedPages.current.clear();
        requestCount.current = 0;              // ← reset cap
    }, [q]);

    const load = useCallback(async () => {
        // stop once we’ve hit the cap
        if (requestCount.current >= MAX_REQUESTS) {
            setHasMore(false);
            return;
        }

        const key = `${q || "top"}:${page}`;
        if (loading || !hasMore || fetchedPages.current.has(key)) return;

        fetchedPages.current.add(key);
        requestCount.current += 1;             // ← count this request

        setLoading(true);
        try {
            const data = q ? await fetchMovies(q, page) : await fetchTopRatedMovies(page);
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

            setPage(p => p + 1);
        } catch (e) {
            console.error("Error fetching movies", e);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [q, page, loading, hasMore]);

// observer + initial trigger stay the same
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) load(); },
            { root: null, rootMargin: "400px 0px", threshold: 0 }
        );
        const el = sentinelRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [load]);

    useEffect(() => { void load(); }, [load]);

    return (
        <div>
            <SearchBar />
            <h1 className="text-lg font-semibold my-4">
                {q ? `Results for: ${q}` : "Top Rated Movies"}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {movies.map(m => <MovieCard key={m.id} {...m} />)}
                {loading &&
                    Array.from({ length: 10 }).map((_, i) => (
                        <div key={`sk-${i}`} className="w-full h-[342px] bg-[var(--app-surface)] rounded animate-pulse" />
                    ))
                }
                {!loading && !hasMore && movies.length === 0 && (
                    <p className="col-span-full text-[var(--app-muted)]">No movies found.</p>
                )}
            </div>

            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="h-10" />
        </div>
    );
}
