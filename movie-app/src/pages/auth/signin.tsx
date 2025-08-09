import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function SignIn() {
    const router = useRouter();
    const { data: session } = useSession();
    const callbackUrl =
        (router.query.callbackUrl as string) || "/profile"; // default target

    // If already logged in, go straight to target
    useEffect(() => {
        if (session) router.replace(callbackUrl);
    }, [session, callbackUrl, router]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Let NextAuth tell us where to go
        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
            callbackUrl,
        });

        if (!res) return;
        if (res.error) {
            setError("Invalid credentials");
            return;
        }

        // On Vercel, prefer router.replace(res.url) instead of window.location
        router.replace(res.url || callbackUrl);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Log In</h2>

                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="block w-full p-2 border rounded text-black"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="block w-full p-2 border rounded text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Log In
                </button>
            </form>
        </div>
    );
}
