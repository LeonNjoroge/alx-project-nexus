// import Link from "next/link";
// import { useRouter } from "next/router";
// import clsx from "clsx";
// import { useSession, signOut } from "next-auth/react";
//
// const nav = [
//     { name: "Home", href: "/" },
//     { name: "Search", href: "/search" },
//     { name: "Saved", href: "/saved" },
// ];
//
// export default function Header() {
//     const { pathname } = useRouter();
//     const { data: session, status } = useSession();
//
//     return (
//         <header className="sticky top-0 z-50 border-b bg-[var(--app-surface)] border-[var(--app-border)]">
//             <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
//                 {/* Brand */}
//                 <Link href="/" className="flex items-center gap-2 select-none">
//           <span className="text-xl font-semibold tracking-tight text-[var(--app-fg)]">
//             🎬 Prescribed Movies
//           </span>
//                 </Link>
//
//                 {/* Nav */}
//                 <nav aria-label="Main">
//                     <ul className="flex items-center gap-6">
//                         {nav.map((item) => {
//                             const active = pathname === item.href;
//                             return (
//                                 <li key={item.name}>
//                                     <Link
//                                         href={item.href}
//                                         className={clsx(
//                                             "text-sm font-medium transition-colors",
//                                             active
//                                                 ? "text-[var(--app-primary)]"
//                                                 : "text-[var(--app-muted)] hover:text-[var(--app-fg)]"
//                                         )}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </nav>
//
//                 {/* CTA */}
//                 {status === "loading" ? null : session ? (
//                     <div className="flex items-center gap-4">
//                         <Link
//                             href="/profile"
//                             className="rounded-full px-3 py-1.5 text-sm font-semibold
//                bg-[var(--app-primary)] text-[var(--app-primary-contrast)]
//                hover:opacity-90 transition-opacity"
//                         >
//                             Profile
//                         </Link>
//                         <button
//                             className="px-4 py-2 bg-red-600 text-white rounded text-sm"
//                             onClick={() => signOut({ callbackUrl: "/" })}
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="flex items-center gap-4">
//                         <Link
//                             href="/auth/signin"
//                             className="text-sm text-[var(--app-fg)] font-medium hover:underline"
//                         >
//                             Login
//                         </Link>
//                         <Link
//                             href="/auth/signup"
//                             className="px-4 py-1.5 bg-[var(--app-primary)] text-white rounded text-sm font-semibold"
//                         >
//                             Sign Up
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// }


import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const nav = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Saved", href: "/saved" },
];

export default function Header() {
    const { pathname } = useRouter();
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b bg-[var(--app-surface)] border-[var(--app-border)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:px-6">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 select-none">
          <span className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--app-fg)]">
            🎬 Prescribed Movies
          </span>
                </Link>
                <button
                    className="inline-flex items-center justify-center rounded md:hidden p-2 text-[var(--app-fg)] hover:bg-[var(--app-surface-2,rgba(255,255,255,0.06))] focus:outline-none"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? (
                        // Close icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Desktop nav + CTAs */}
                <div className="hidden md:flex items-center gap-6">
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
                        <div className="flex items-center gap-3">
                            <Link
                                href="/profile"
                                className="rounded-full px-3 py-1.5 text-sm font-semibold
                           bg-[var(--app-primary)] text-[var(--app-primary-contrast)]
                           hover:opacity-90 transition-opacity"
                            >
                                Profile
                            </Link>
                            <button
                                className="px-3 py-1.5 bg-red-600 text-white rounded text-sm"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/auth/signin"
                                className="text-sm text-[var(--app-fg)] font-medium hover:underline"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="px-3 py-1.5 bg-[var(--app-primary)] text-white rounded text-sm font-semibold"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu (collapsible) */}
            <div
                className={clsx(
                    "md:hidden border-t border-[var(--app-border)] bg-[var(--app-surface)]",
                    open ? "block" : "hidden"
                )}
            >
                <nav aria-label="Mobile" className="px-3 py-2 sm:px-4">
                    <ul className="flex flex-col gap-2">
                        {nav.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={clsx(
                                            "block w-full rounded px-2 py-2 text-sm font-medium",
                                            active
                                                ? "text-[var(--app-primary)]"
                                                : "text-[var(--app-fg)] hover:bg-[var(--app-surface-2,rgba(255,255,255,0.06))]"
                                        )}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile CTAs */}
                    <div className="mt-3 border-t border-[var(--app-border)] pt-3 flex items-center gap-3">
                        {status === "loading" ? null : session ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex-1 text-center rounded-full px-3 py-2 text-sm font-semibold
                             bg-[var(--app-primary)] text-[var(--app-primary-contrast)] hover:opacity-90"
                                    onClick={() => setOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded text-sm"
                                    onClick={() => {
                                        setOpen(false);
                                        signOut({ callbackUrl: "/" });
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="flex-1 text-center rounded px-3 py-2 text-sm font-semibold border border-[var(--app-border)] text-[var(--app-fg)]"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="flex-1 text-center rounded px-3 py-2 text-sm font-semibold bg-[var(--app-primary)] text-white"
                                    onClick={() => setOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
