import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {supabaseAdmin} from "@/services/supabase/admin";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const username = credentials?.username?.trim();
                const password = credentials?.password;
                if (!username || !password) return null;

                // fetch user from Supabase
                const { data: user, error } = await supabaseAdmin
                    .from("users")
                    .select("id, username, password_hash")
                    .eq("username", username)
                    .maybeSingle();

                if (error || !user) return null;

                const ok = await bcrypt.compare(password, user.password_hash);
                if (!ok) return null;

                return {
                    id: String(user.id),
                    name: user.username,
                    email: `${user.username}@app.local`,
                };
            },
        }),
    ],

    session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                session.user.name = token.name || session.user.name;
                session.user.email = token.email || session.user.email;
            }
            return session;
        },
    },

    pages: { signIn: "/auth/signin" },
    debug: process.env.NODE_ENV !== "production",
};

export default NextAuth(authOptions);
