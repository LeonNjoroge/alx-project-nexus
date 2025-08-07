import { useState } from "react";
import { useRouter } from "next/router";
import {getSession} from "next-auth/react";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();
    //
    //     const res = await fetch("/api/auth/register", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ username, password }),
    //     });
    //
    //     if (res.ok) {
    //         router.push("/auth/signin");
    //     } else {
    //         const { error } = await res.json();
    //         setMessage(error || "Signup failed");
    //     }
    // }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!res.ok) {
            setMessage(data.message);
        } else {
            // router("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Sign Up</h2>

                {message && <p className="text-red-600 text-sm mb-4">{message}</p>}

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full text-black p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full text-black p-2 border rounded"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Create Account
                </button>
            </form>
        </div>
    );
}
