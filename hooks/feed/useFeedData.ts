import { useState, useEffect } from "react";
import axios from "axios";

export function useFeedData({ currentPage } : {currentPage: number}) {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [feed, setFeed] = useState<any[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);


    const fetchFeed = async () => {
        setStatus('loading'); // Show spinner during refresh
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-feed`);
            setFeed(res.data);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const refetchFeed = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-feed`);
            setFeed((prev) => [...prev, ...res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    useEffect(() => {
        if (
            currentPage >= feed.length * 0.75 &&
            !isFetchingMore
        ) {
            setIsFetchingMore(true);
            refetchFeed().finally(() => {
                setIsFetchingMore(false);
            });
        }
    }, [currentPage, feed.length]);

    return {
        feed,
        fetchFeed,
        status,
        isFetchingMore
    }
}