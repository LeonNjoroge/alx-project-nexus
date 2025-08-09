import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type WithAuthOptions = { redirectTo?: string };

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
        const session = await getServerSession(context.req, context.res, authOptions);

        if (!session) {
            const callback = encodeURIComponent(context.resolvedUrl || "/");
            return {
                redirect: {
                    destination: `${redirectTo}?callbackUrl=${callback}`,
                    permanent: false,
                },
            };
        }

        const safeSession = JSON.parse(JSON.stringify(session)) as Session;

        if (getProps) return getProps(context, safeSession);

        return { props: { session: safeSession } as T };
    };
}
