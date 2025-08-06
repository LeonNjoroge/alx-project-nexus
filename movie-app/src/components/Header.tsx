
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const nav = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Saved", href: "/saved" },
];

export default function Header() {
    const { pathname } = useRouter();

    return (
        <header className="sticky top-0 z-50 border-b bg-[var(--app-surface)] border-[var(--app-border)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 select-none">
          <span className="text-xl font-semibold tracking-tight text-[var(--app-fg)]">
            🎬 Prescribed Movies
          </span>
                </Link>

                {/* Nav */}
                <nav aria-label="Main">
                    <ul className="flex items-center gap-6">
                        {nav.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={clsx(
                                            "text-sm font-medium transition-colors",
                                            active
                                                ? "text-[var(--app-primary)]"
                                                : "text-[var(--app-muted)] hover:text-[var(--app-fg)]"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* CTA (optional) */}
                <Link
                    href="/profile"
                    className="rounded-full px-3 py-1.5 text-sm font-semibold
                     bg-[var(--app-primary)] text-[var(--app-primary-contrast)]
                     hover:opacity-90 transition-opacity"
                >
                    Profile
                </Link>
            </div>
        </header>
    );
}
