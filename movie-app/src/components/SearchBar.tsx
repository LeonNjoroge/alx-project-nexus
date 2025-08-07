"use client";

import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBar({ placeholder = "Search for a Movie" }) {
    const [q, setQ] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (q.trim()) {
           // router.push(`/search?q=${encodeURIComponent(q.trim())}`);
            router.push(`/`);
        }
    };

    return (
        <div className="flex items-center rounded-full bg-[var(--app-surface)] px-5 py-3">
            <span className="text-[var(--app-muted)]">🔍</span>
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                }}
                placeholder={placeholder}
                className="ml-2 flex-1 bg-transparent text-[var(--app-fg)] placeholder:text-[var(--app-muted)] outline-none"
            />
            <button
                onClick={handleSearch}
                className="ml-2 text-sm font-semibold text-[var(--app-primary)] hover:underline"
            >
                Search
            </button>
        </div>
    );
}
