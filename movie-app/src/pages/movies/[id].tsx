import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchRecommendations } from "@/pages/api/tmbd";
import { MovieDetails, Movie } from "@/interfaces/interface";
import MovieCard from "@/components/MovieCard";
import Image from "next/image";

export default function MovieDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [recs, setRecs] = useState<Movie[]>([]);

    useEffect(() => {
        if (id) {
            fetchMovieDetails(id as string).then(setMovie);
            fetchRecommendations(id as string).then((data) => setRecs(data.results));
        }
    }, [id]);

    if (!movie) return <div className="p-6">Loading...</div>;

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://placehold.co/500x750/1a1a1a/FFFFFF.png?text=No+Image";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Poster */}
            <div className="w-full max-w-md mx-auto md:mx-0">
                <Image
                    src={poster}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="rounded-lg w-full h-auto object-cover"
                />
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-4">
                <h1 className="text-3xl font-bold text-[var(--app-fg)]">{movie.title}</h1>
                {movie.tagline && <p className="italic text-[var(--app-muted)]">{movie.tagline}</p>}

                {movie.overview && <p className="text-sm leading-relaxed">{movie.overview}</p>}

                <div className="flex flex-wrap gap-4 text-sm text-[var(--app-muted)] mt-4">
                    {movie.release_date && (
                        <div>
                            <span className="font-semibold text-[var(--app-fg)]">📅 Release:</span> {movie.release_date}
                        </div>
                    )}
                    {movie.runtime && (
                        <div>
                            <span className="font-semibold text-[var(--app-fg)]">⏱ Runtime:</span> {movie.runtime} mins
                        </div>
                    )}
                    {movie.vote_average && (
                        <div>
                            <span className="font-semibold text-[var(--app-fg)]">⭐ Rating:</span>{" "}
                            {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes)
                        </div>
                    )}
                    {movie.original_language && (
                        <div>
                            <span className="font-semibold text-[var(--app-fg)]">🌍 Language:</span>{" "}
                            {movie.original_language.toUpperCase()}
                        </div>
                    )}
                    {movie.genres?.length > 0 && (
                        <div>
                            <span className="font-semibold text-[var(--app-fg)]">🎭 Genres:</span>{" "}
                            {movie.genres.map((g) => g.name).join(", ")}
                        </div>
                    )}
                </div>

                {/* External links */}
                <div className="flex gap-4 mt-4 text-sm">
                    {movie.homepage && (
                        <a
                            href={movie.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--app-primary)] hover:underline"
                        >
                            🌐 Official Website
                        </a>
                    )}
                    {movie.imdb_id && (
                        <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--app-primary)] hover:underline"
                        >
                            🎬 IMDb Page
                        </a>
                    )}
                </div>

                {/* Recommendations */}
                {/*<div className="mt-10">*/}
                {/*    <h2 className="text-xl font-semibold text-[var(--app-fg)] mb-4">Recommended Movies</h2>*/}
                {/*    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">*/}
                {/*        {recs.map((m) => (*/}
                {/*            <MovieCard key={m.id} {...m} />*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold text-[var(--app-fg)] mb-4">Recommended Movies</h2>

                    {recs.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                            {recs.map((m) => (
                                <MovieCard key={m.id} {...m} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-md text-[var(--app-muted)]">Sorry, No recommendations available for this movie at the moment.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
