import { motion, PanInfo, AnimatePresence } from "motion/react";
import { Spinner } from "../ui/Spinner";
import { FeedCard } from "./FeedCard";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/feed/useBookmarks";
import { createPortal } from "react-dom";
import { useState } from "react";

export function FeedView({ className, handleDragEnd, currentPage, isFetchingMore, feed, y }: {
    className: string,
    handleDragEnd: (e: any, info: PanInfo) => void,
    currentPage: number,
    isFetchingMore: boolean,
    feed: FeedContentProps[]
    y: any
}) {

    const { bookmarkedUrls, toggleBookmark, toggleBookmarkDoubleClick } = useBookmarks();
    const [bookmarkVisible, setBookmarkVisible] = useState(false);

    const handleBookmarkAnimation = () => {
        setBookmarkVisible(true);
        setTimeout(() => setBookmarkVisible(false), 700)
    }

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

            {typeof window !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {bookmarkVisible &&
                            <motion.div
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                                key='bookmark'
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 3.5 }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                <Bookmark
                                    className="fill-white text-white  drop-shadow-md"
                                />
                            </motion.div>
                        }
                    </AnimatePresence>
                    ,
                    document.body
                )
            }

            {visibleFeed.map((item, i) => {
                const index = Math.max(0, currentPage - 1) + i;
                console.log(visibleFeed)
                return (
                    <motion.div
                        key={index}
                        style={{ top: index * height }}
                        className="absolute w-full h-dvh flex items-center justify-center p-4"
                        onDoubleClick={() => {
                            toggleBookmarkDoubleClick(item.src)
                            handleBookmarkAnimation();
                        }}
                    >
                        <FeedCard {...item} isBookmarked={bookmarkedUrls.has(item.src)} toggleBookmark={toggleBookmark} />
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