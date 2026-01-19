'use client';

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import axios from "axios";
import { Spinner } from "@/components/ui/Spinner";
import { WentWrong } from "@/components/error/WentWrong";
import { useRouter } from "next/navigation";
import { InterestForm } from "@/components/interest_check/InterestForm";

export default function InterestCheckPage() {
    const { userId } = useAuth(); 
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [hasInterests, setHasInterests] = useState<boolean>(false);
    const router = useRouter();

    const fetchData = useCallback(async (signal: AbortSignal) => {
        if (!userId) return;

        setStatus('loading');
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/interests/${userId}`,
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
                <WentWrong />
            </main>
        );
    }

    if (hasInterests) {
        router.replace('/feed');
        return null;
    }

    return <InterestForm />;
}