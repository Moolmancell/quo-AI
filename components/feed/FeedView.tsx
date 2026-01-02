import { motion, PanInfo } from "motion/react";
import { Spinner } from "../ui/Spinner";
import { FeedCard } from "./FeedCard";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function FeedView({ handleDragEnd, currentPage, isFetchingMore, feed, y } : {
    handleDragEnd: (e: any, info: PanInfo) => void,
    currentPage: number,
    isFetchingMore: boolean,
    feed: FeedContentProps[]
    y: any
}) {

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
            className="flex flex-col fixed top-0 w-full"
        >
            {visibleFeed.map((item, i) => {
                const index = Math.max(0, currentPage - 1) + i;
                console.log(visibleFeed)
                return (
                    <motion.div
                        key={index}
                        style={{ top: index * height }}
                        className="absolute w-full h-dvh flex items-center justify-center p-4"
                    >
                        <FeedCard {...item} />
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