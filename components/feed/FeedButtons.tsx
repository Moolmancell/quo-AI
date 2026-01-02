import { Button } from "../ui/Button"
import { Spinner } from "../ui/Spinner"
import { ArrowUp, ArrowDown } from 'lucide-react'
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps"

export function FeedButtons({ className, currentPage, handleNextPage, isFetchingMore, handlePreviousPage, feed } : {
    className: string,
    currentPage: number,
    handleNextPage: () => void,
    isFetchingMore: boolean,
    handlePreviousPage: () => void,
    feed: FeedContentProps[]
}) {
    return (
        <div className={className}>
            <Button size="icon-lg" onClick={handlePreviousPage} disabled={currentPage <= 0}><ArrowUp /></Button>
            <Button variant={isFetchingMore ? "ghost" : "default"} size="icon-lg" onClick={handleNextPage} disabled={isFetchingMore}>
                {isFetchingMore && currentPage >= feed.length - 1 ? <Spinner /> : <ArrowDown />}
            </Button>
        </div>
    )
}