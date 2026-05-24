'use client';

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../providers/AuthProvider";
import axios from "@/lib/axios";
import { Spinner } from "../ui/Spinner";
import { WentWrong } from "../error/WentWrong";
import { useRouter } from "next/navigation";   

export function InterestCheck({ children }: { children: React.ReactNode }) {
    const { userId } = useAuth(); 
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [hasInterests, setHasInterests] = useState<boolean>(false);
    const router = useRouter();

    const fetchData = useCallback(async (signal: AbortSignal) => {
        if (!userId) return;

        setStatus('loading');
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/interests/get-interests`,
                { signal }
            );

            setHasInterests(response.data.interests.length > 0);
            setStatus('success');
        } catch (err) {
            if (axios.isCancel(err)) return;
            console.error("Interest fetch failed:", err);
            setStatus('error');
        }
    }, [userId]);

    useEffect(() => {
        const controller = new AbortController();

        fetchData(controller.signal);

        return () => controller.abort();
    }, [fetchData]);

    if (status === 'loading' || !userId) {
        return (
            <main className="flex justify-center items-center w-full h-screen bg-background">
                <Spinner className="size-8" />
            </main>
        );
    }

    if (status === 'error') {
        return (
            <main className="flex justify-center items-center w-full h-screen bg-background">
                <WentWrong onClick={() => fetchData(new AbortController().signal)} />
            </main>
        );
    }

    if (!hasInterests) {
        router.replace('/interest-check');
        return null;
    }
    
    return <>{children}</>;
}