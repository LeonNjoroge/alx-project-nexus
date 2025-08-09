import type { Movie } from "@/interfaces/interface";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function MovieCard({
                                      id,
                                      poster_path,
                                      title,
                                      vote_average,
                                      release_date,
                                  }: Movie) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);

    const isSavedPage = router.pathname === "/saved";
    const isUnauthenticated = status === "unauthenticated" || !session;

    const handleFavourite = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!session) return;

        setLoading(true);
        try {
            if (isSavedPage) {
                // REMOVE from favourites
                const res = await fetch("/api/favourites", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieId: id }),
                });
                if (!res.ok) throw new Error("Failed to remove favourite");
                setRemoved(true); // hide from UI after deletion
            } else {
                // ADD to favourites
                const res = await fetch("/api/favourites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ movieId: id }),
                });
                if (!res.ok) throw new Error("Failed to save favourite");
                setAdded(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // If removed from favourites, hide the card
    if (removed) return null;

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
                onClick={handleFavourite}
                disabled={loading || added || isUnauthenticated}
                className={`mt-2 py-1 px-3 rounded text-sm font-medium ${
                    isSavedPage
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : added
                            ? "bg-green-600 text-white"
                            : isUnauthenticated
                                ? "bg-gray-500 text-white cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                {isUnauthenticated
                    ? "Log in to favourite"
                    : isSavedPage
                        ? loading
                            ? "Removing..."
                            : "Remove from Favourites"
                        : added
                            ? "Added ✓"
                            : loading
                                ? "Adding..."
                                : "Add to Favourites"}
            </button>
        </div>
    );
}
