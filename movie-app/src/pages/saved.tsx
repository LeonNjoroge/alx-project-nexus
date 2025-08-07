import { Movie } from "@/interfaces/interface";
import MovieCard from "@/components/MovieCard";
import {withAuth} from "@/services/withAuth";

interface SavedProps {
    savedMovies: Movie[];
}
export const getServerSideProps = withAuth();


export default function Saved({ savedMovies }: SavedProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Favourited Movies</h1>

            {savedMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {savedMovies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            ) : (
                <p className="text-[var(--app-muted)]">You haven't saved any movies yet.</p>
            )}
        </div>
    );
}
