import { useState, useEffect, useCallback } from "react";
import axios from "@/lib/axios";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function useFeedData() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [feed, setFeed] = useState<FeedContentProps[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);


    const fetchFeed = useCallback(async () => {
        setStatus('loading'); // Show spinner during refresh
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feed/get-feed`);
            // Ensure feed is an array. If backend returns { feed: [...] } or { data: [...] }, adjust accordingly.
            const data = Array.isArray(res.data) ? res.data : (res.data.feed || res.data.data || []);
            setFeed(data);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    }, []);

    const refetchFeed = useCallback(async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feed/get-feed`);
            const data = Array.isArray(res.data) ? res.data : (res.data.feed || res.data.data || []);
            setFeed((prev) => [...prev, ...data]);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    return {
        feed,
        fetchFeed,
        refetchFeed,
        status,
        isFetchingMore,
        setIsFetchingMore
    }
}
