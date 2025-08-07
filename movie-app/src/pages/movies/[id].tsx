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
            fetchRecommendations(id as string).then(data => setRecs(data.results));
        }
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="grid md:grid-cols-3 gap-6 px-4 py-6">
            <Image
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
                alt={movie.title}
                width={228}
                height={342}
                className="rounded-lg"
            />
            <div className="md:col-span-2">
                <h1 className="text-2xl font-bold">{movie.title}</h1>
                <p className="mt-2 text-sm text-light-300">{movie.tagline}</p>
                <p className="mt-4">{movie.overview}</p>

                <h2 className="text-lg font-semibold mt-8">Recommended</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
                    {recs.map((m) => <MovieCard key={m.id} {...m} />)}
                </div>
            </div>
        </div>
    );
}
