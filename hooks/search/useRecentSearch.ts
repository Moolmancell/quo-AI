"use client";

import axios from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";

export type FetchStatus = "idle" | "loading" | "success" | "error";

export function useRecentSearch() {
    const [status, setStatus] = useState<FetchStatus>("idle");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const fetchRecentSearches = useCallback(async () => {
        setStatus("loading");
        try {
            const { data } = await axios.get<string[]>(
                `${process.env.NEXT_PUBLIC_API_URL}/api/search/get-recent-searches`
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

    const deleteSearch = useCallback(async (search: string) => {
        try {
            setRecentSearches((prev) => prev.filter((s) => s !== search));
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/search/remove-recent-search`, { data: { search } });
        } catch (error) {
            console.error("Error deleting search:", error);
        }
    }, []);

    const clearSearches = useCallback(async () => {
        try {
            setRecentSearches([]);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/search/clear-recent-search`);
        } catch (error) {
            console.error("Error clearing searches:", error);
        }
    }, []);

    return { recentSearches, status, refetch: fetchRecentSearches, deleteSearch, clearSearches };
}