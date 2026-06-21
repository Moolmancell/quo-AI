"use client"

import axios from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";

export function useSearchArticles({search}: {search: string}) {
    const [searchResultsArticles, setResultsArticles] = useState<any[]>([]);
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const fetchSearchResults = useCallback(async (search: string, pageNum: number = 1) => {
        if (pageNum === 1) {
            setStatus("loading");
            setIsFetchingMore(false);
        } else {
            setIsFetchingMore(true);
        }

        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${search}&type=Articles/Essays&page=${pageNum}`
            );
            const { data, hasMore: more } = res.data;

            if (pageNum === 1) {
                setResultsArticles(data);
                setStatus("success");
            } else {
                setResultsArticles(prev => [...prev, ...data]);
            }
            setHasMore(more);
        } catch {
            if (pageNum === 1) {
                setStatus("error");
            } else {
                setPage(prev => prev - 1);
            }
        } finally {
            if (pageNum > 1) {
                setIsFetchingMore(false);
            }
        }
    }, []);

    const fetchMore = useCallback(() => {
        if (!isFetchingMore && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchSearchResults(search, nextPage);
        }
    }, [isFetchingMore, hasMore, page, search, fetchSearchResults]);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setIsFetchingMore(false);
        fetchSearchResults(search, 1);
    }, [search, fetchSearchResults]);

    const retry = useCallback(() => {
        setPage(1);
        setHasMore(true);
        setIsFetchingMore(false);
        setResultsArticles([]);
        fetchSearchResults(search, 1);
    }, [search, fetchSearchResults]);

    return { searchResultsArticles, status, fetchMore, isFetchingMore, hasMore, retry };

}