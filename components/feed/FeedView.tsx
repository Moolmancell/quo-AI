import { motion, PanInfo } from "motion/react";
import { Spinner } from "../ui/Spinner";
import { FeedCard } from "./FeedCard";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";
import { useBookmarks } from "@/hooks/feed/useBookmarks";
import { useBookmarkAnimation } from "@/hooks/feed/useBookmarkAnimation";
import { BookmarkAnimation } from "./BookmarkAnimation";

export function FeedView({ className, handleDragEnd, currentPage, isFetchingMore, feed, y }: {
    className: string,
    handleDragEnd: (e: any, info: PanInfo) => void,
    currentPage: number,
    isFetchingMore: boolean,
    feed: FeedContentProps[]
    y: any
}) {

    const { bookmarkedUrls, toggleBookmark, toggleBookmarkDoubleClick } = useBookmarks();
    const { handleBookmarkAnimation, bookmarkVisible } = useBookmarkAnimation();

    const height = typeof window !== "undefined"
        ? window.innerHeight
        : 0;

    const visibleFeed = feed.slice(
        Math.max(0, currentPage - 1),
        Math.min(feed.length, currentPage + 2)
    );

    return (
        <motion.div
            drag="y"
            onDragEnd={handleDragEnd}
            dragConstraints={{
                top: -(feed.length - 1) * height,
                bottom: 0,
            }}
            dragElastic={{ top: 0.5, bottom: 0.12 }}
            dragMomentum={false}
            style={{ y }}
            className={className}
        >

            <BookmarkAnimation bookmarkVisible={bookmarkVisible} />

            {visibleFeed.map((item, i) => {
                const index = Math.max(0, currentPage - 1) + i;
                console.log(visibleFeed)
                return (
                    <motion.div
                        key={index}
                        style={{ top: index * height }}
                        className="absolute w-full h-dvh flex items-center justify-center p-4"
                        onDoubleClick={() => {
                            toggleBookmarkDoubleClick(item)
                            handleBookmarkAnimation();
                        }}
                    >
                        {/*BUG: function toggle*/}
                        <FeedCard {...item} isBookmarked={bookmarkedUrls.has(item.src)} toggleBookmark={() => toggleBookmark(item)}/>
                    </motion.div>
                );
            })}
            {isFetchingMore && (
                <motion.div
                    style={{ top: feed.length * height }}
                    className="absolute w-full h-dvh flex items-center justify-center"
                >
                    <Spinner className='size-8 absolute top-0' />
                </motion.div>
            )}
        </motion.div>
    )
}