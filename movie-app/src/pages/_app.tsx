import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Header />
    <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)] p-10">
      <Component {...pageProps} />
    </main>
    </>
);

}
