"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { WentWrong } from "@/components/error/WentWrong";

interface ProtectedRouteProps {
    children: React.ReactNode;
    reverse?: boolean; // true for "guest-only" pages like Login/Signup
}

export function ProtectedRoute({ children, reverse = false }: ProtectedRouteProps) {
    const { data: session, isPending, error, refetch } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (isPending) return;

        if (!reverse && !session) {
            router.replace("/login");
        } else if (reverse && session) {
            router.replace("/feed");
        }
    }, [session, isPending, router, reverse]);

    if (error) {
        return (
            <WentWrong 
                onClick={() => refetch()} 
                className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
        );
    }

    if (isPending) {
        return <Spinner className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8" />;
    }

    // Logic: 
    // If Protected (reverse=false): show if session exists
    // If Guest-only (reverse=true): show if session does NOT exist
    const canAccess = reverse ? !session : !!session;

    return canAccess ? <>{children}</> : null;
}