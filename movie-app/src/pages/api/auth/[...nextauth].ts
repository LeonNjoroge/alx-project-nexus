import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { openDB } from "@/services/db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const db = await openDB();
                const user = await db.get("SELECT * FROM users WHERE username = ?", credentials.username);

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return {
                        id: user.id,
                        name: user.username,
                        email: `${user.username}@app.local`
                    };
                }

                return null;
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
};

export default NextAuth(authOptions);
