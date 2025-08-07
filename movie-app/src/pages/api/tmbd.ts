export const TMDB_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    HEADERS: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
    },
};

export async function fetchMovies(query = "") {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const res = await fetch(endpoint, { headers: TMDB_CONFIG.HEADERS });
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
}

export async function fetchMovieDetails(id: string) {
    const res = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}`, { headers: TMDB_CONFIG.HEADERS });
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return res.json();
}

export async function fetchRecommendations(id: string) {
    const res = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}/recommendations`, { headers: TMDB_CONFIG.HEADERS });
    if (!res.ok) throw new Error("Failed to fetch recommendations");
    return res.json();
}
