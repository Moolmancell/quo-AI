import { useState } from "react";

export function useFeedPage({feed} : {feed: Object[]}) {
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