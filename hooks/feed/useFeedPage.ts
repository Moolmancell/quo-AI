import { useState } from "react";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function useFeedPage({feed} : {feed: FeedContentProps[]}) {
    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = () => {
        if (currentPage < feed.length - 1) {
            setCurrentPage((prev: number) => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev: number) => prev - 1)
        }
    }

    return {
        handleNextPage,
        handlePreviousPage,
        currentPage,
        setCurrentPage
    }
}