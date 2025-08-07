import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
      <SessionProvider session={session}>
        <Header />
        <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)] p-10">
          <Component {...pageProps} />
        </main>
      </SessionProvider>
  );
}
