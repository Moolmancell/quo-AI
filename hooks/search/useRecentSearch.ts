"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export type FetchStatus = "idle" | "loading" | "success" | "error";

export function useRecentSearch() {
    const [status, setStatus] = useState<FetchStatus>("idle");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const fetchRecentSearches = useCallback(async () => {
        setStatus("loading");
        try {
            const { data } = await axios.get<string[]>(
                `${process.env.NEXT_PUBLIC_API_URL}/api/get-recent-searches`
            );
            
            setRecentSearches(Array.isArray(data) ? data : []);
            setStatus("success");
        } catch (error) {
            console.error("Error fetching recent searches:", error);
            setStatus("error");
        }
    }, []);

    useEffect(() => {
        fetchRecentSearches();
    }, [fetchRecentSearches]);

    return { recentSearches, status, refetch: fetchRecentSearches };
}