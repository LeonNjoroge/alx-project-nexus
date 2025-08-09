// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: DefaultSession["user"] & {
            id: string; // we attach this in session callback
        };
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
    }
}
