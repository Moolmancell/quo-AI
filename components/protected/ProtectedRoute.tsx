"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { WentWrong } from "@/components/error/WentWrong";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()   
    
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    if (error) {
        return <WentWrong onClick={() => refetch()} className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"/>
    }

    if (isPending) {
        return <Spinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-8" />; // Replace with a Spinner
    }

    return session ? <>{children}</> : null;
}