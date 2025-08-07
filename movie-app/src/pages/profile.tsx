import type { Session } from "next-auth";
import {withAuth} from "@/services/withAuth";

interface Props {
    session: Session;
}

export const getServerSideProps = withAuth();

export default function Profile({ session }: Props) {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
            <p>Email: {session.user?.email}</p>
        </div>
    );
}

