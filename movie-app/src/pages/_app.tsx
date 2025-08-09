import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }: AppProps<{ session: Session | null }>) {
    return (
        <SessionProvider session={session}>
            <Header />
            <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)] p-10">
                <Component {...pageProps} />
            </main>
        </SessionProvider>
    );
}
