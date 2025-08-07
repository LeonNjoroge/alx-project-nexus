import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";

const nav = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Saved", href: "/saved" },
];

export default function Header() {
    const { pathname } = useRouter();
    const { data: session, status } = useSession();

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

                {/* CTA */}
                {status === "loading" ? null : session ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/profile"
                            className="rounded-full px-3 py-1.5 text-sm font-semibold
               bg-[var(--app-primary)] text-[var(--app-primary-contrast)]
               hover:opacity-90 transition-opacity"
                        >
                            Profile
                        </Link>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded text-sm"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/auth/signin"
                            className="text-sm text-[var(--app-fg)] font-medium hover:underline"
                        >
                            Login
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="px-4 py-1.5 bg-[var(--app-primary)] text-white rounded text-sm font-semibold"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
