import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";

type WithAuthOptions = {
    redirectTo?: string;
};

export function withAuth<T>(
    getServerSidePropsFunc?: (
        context: GetServerSidePropsContext,
        session: any
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
                redirect: {
                    destination: redirectTo,
                    permanent: false,
                },
            };
        }

        if (getServerSidePropsFunc) {
            return getServerSidePropsFunc(context, session);
        }

        return {
            props: { session } as unknown as T,
        };
    };
}
