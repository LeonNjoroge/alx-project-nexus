import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

type WithAuthOptions = { redirectTo?: string };

// T must include { session: Session | null }
export function withAuth<T extends { session: Session | null }>(
    getProps?: (
        ctx: GetServerSidePropsContext,
        session: Session
    ) => Promise<GetServerSidePropsResult<T>>,
    options: WithAuthOptions = {}
) {
    const { redirectTo = "/auth/signin" } = options;

    return async (
        context: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<T>> => {
        const session = await getSession(context);

        if (!session) {
            return {
                redirect: { destination: redirectTo, permanent: false },
            };
        }


        const safeSession = JSON.parse(JSON.stringify(session)) as Session;

        if (getProps) {
            return getProps(context, safeSession);
        }

        return {
            props: { session: safeSession } as T,
        };
    };
}
