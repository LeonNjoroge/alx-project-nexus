import type { Movie } from "@/interfaces/interface";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function MovieCard({
                                      id,
                                      poster_path,
                                      title,
                                      vote_average,
                                      release_date,
                                  }: Movie) {
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddFavourite = async (e: React.MouseEvent) => {
        e.preventDefault(); // prevent the Link from triggering
        setLoading(true);
        try {
            const res = await fetch("/api/favourites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movieId: id }),
            });

            if (!res.ok) throw new Error("Failed to save favourite");
            setAdded(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-[228px] min-w-[180px] max-w-[228px] text-[var(--app-fg)]">
            <Link
                href={`/movies/${id}`}
                className="hover:opacity-90 transition flex flex-col flex-1"
            >
                <div className="rounded-lg overflow-hidden">
                    <Image
                        src={
                            poster_path
                                ? `https://image.tmdb.org/t/p/w342${poster_path}`
                                : "https://placehold.co/228x342/1a1a1a/FFFFFF.png"
                        }
                        alt={title}
                        width={228}
                        height={342}
                        className="object-cover w-full h-auto rounded"
                    />
                </div>

                <h3 className="mt-2 text-sm font-semibold truncate">{title}</h3>

                <div className="flex items-center justify-between text-xs mt-2">
                    <div className="flex items-center gap-1 text-[var(--app-fg)]">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-semibold">
              {Math.round((vote_average ?? 0) / 2)}
            </span>
                    </div>

                    <div className="text-[var(--app-muted)]">
                        {release_date?.split("-")[0] ?? ""}
                    </div>
                </div>
            </Link>

            <button
                onClick={handleAddFavourite}
                disabled={loading || added}
                className={`mt-2 py-1 px-3 rounded text-sm font-medium ${
                    added
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                {added ? "Added ✓" : loading ? "Adding..." : "Add to Favourites"}
            </button>
        </div>
    );
}

