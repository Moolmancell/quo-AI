"use client"

import axios from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";

export function useSearchArticles({search}: {search: string}) {
    const [searchResultsArticles, setResultsArticles] = useState<any[]>([]);
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    const fetchSearchResults = useCallback(async (search: string) => {
        setStatus("loading");
        try {
            const searchResults = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${search}&type=Articles/Essays`);
            setResultsArticles(searchResults.data.data);
            setStatus("success");
        } catch (error) {
            setStatus("error");
        }
    }, []);

    useEffect(() => {
        fetchSearchResults(search);
    }, [search, fetchSearchResults]);

    return { searchResultsArticles, status, fetchSearchResults };

}