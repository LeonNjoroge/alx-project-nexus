import {useEffect, useState} from "react";
import {Movie} from "@/interfaces/interface";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import {fetchMovies} from "@/pages/api/tmbd";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetchMovies().then(data => setMovies(data.results));
    }, []);


    return (
      <div>
          <SearchBar />
          <h2 className="text-lg font-bold mt-6 mb-3">Latest Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((m) => <MovieCard key={m.id} {...m} />)}
          </div>
      </div>
  );
}
