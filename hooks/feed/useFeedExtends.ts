import { useEffect } from "react";

export function useFeedExtends({currentPage, isFetchingMore, setIsFetchingMore, refetchFeed, feed} : {
    currentPage: number,
    isFetchingMore: Boolean,
    setIsFetchingMore: any,
    refetchFeed: any,
    feed: Object[]
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