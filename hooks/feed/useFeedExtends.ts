import { useEffect } from "react";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function useFeedExtends({currentPage, isFetchingMore, setIsFetchingMore, refetchFeed, feed} : {
    currentPage: number,
    isFetchingMore: Boolean,
    setIsFetchingMore: any,
    refetchFeed: any,
    feed: FeedContentProps[]
}) {
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
}