import type { Session } from "next-auth";
import { withAuth } from "@/services/withAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
    session: Session | null;
    favouritesCount: number;
}

export const getServerSideProps = withAuth<Props>(async (ctx, session) => {
    const base = process.env.NEXT_PUBLIC_APP_URL || `http://${ctx.req.headers.host}`;
    const res = await fetch(`${base}/api/favourites?idsOnly=1`, {
        headers: { cookie: ctx.req.headers.cookie || "" },
    });

    const ids: number[] = res.ok ? await res.json() : [];
    return { props: { session, favouritesCount: ids.length } };
});

export default function Profile({ session, favouritesCount }: Props) {
    // keep your previous hydration-safe pattern
    const { data, status } = useSession();
    const s = session ?? data ?? null;

    if (!s && status === "loading") return <div className="p-8">Loading…</div>;
    if (!s) return <div className="p-8">Not signed in</div>;

    const username =
        s.user?.name ??
        (s.user?.email ? s.user.email.split("@")[0] : "User");

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {username}</h1>
            <p className="mt-2">
                You have <strong>{favouritesCount}</strong> favourited movie
                {favouritesCount !== 1 && "s"}.
            </p>

            <Link
                href="/saved"
                className="inline-block mt-4 rounded px-3 py-1.5 text-sm font-semibold
                   bg-[var(--app-primary)] text-[var(--app-primary-contrast)] hover:opacity-90"
            >
                View favourites
            </Link>
        </div>
    );
}
