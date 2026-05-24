import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function useFeedData() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [feed, setFeed] = useState<FeedContentProps[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);


    const fetchFeed = async () => {
        setStatus('loading'); // Show spinner during refresh
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feed/get-feed`);
            setFeed(res.data);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const refetchFeed = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feed/get-feed`);
            setFeed((prev) => [...prev, ...res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return {
        feed,
        fetchFeed,
        refetchFeed,
        status,
        isFetchingMore,
        setIsFetchingMore
    }
}