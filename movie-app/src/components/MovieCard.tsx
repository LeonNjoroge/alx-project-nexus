import type { Movie } from "@/interfaces/interface";
import Link from "next/link";
import Image from "next/image";

export default function MovieCard({
                                      id,
                                      poster_path,
                                      title,
                                      vote_average,
                                      release_date,
                                  }: Movie) {
    return (
        <Link
            href={`/movies/${id}`}
            className="flex flex-col w-[228px] min-w-[180px] max-w-[228px] text-[var(--app-fg)] hover:opacity-90 transition"
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

            <div className="flex items-center gap-1 text-xs mt-1">
                <span>⭐</span>
                <span className="font-semibold">{Math.round((vote_average ?? 0) / 2)}</span>
            </div>

            <div className="text-xs text-[var(--app-muted)] mt-1">
                {release_date?.split("-")[0] ?? ""}
            </div>
        </Link>
    );
}
