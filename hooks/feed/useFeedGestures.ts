import { useRef, useEffect } from "react";
import { animate, PanInfo, useMotionValue } from "motion/react"
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function useFeedGesture({handleNextPage, handlePreviousPage, currentPage, setCurrentPage, feed} : {
    handleNextPage: () => void,
    handlePreviousPage: () => void,
    currentPage: number,
    setCurrentPage: any,
    feed: FeedContentProps[]
}) {

    const scrollLock = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const y = useMotionValue(0);

    const handleDragEnd = (e: any, info: PanInfo) => {
        const threshold = 100;
        if (info.offset.y < -threshold) handleNextPage();
        else if (info.offset.y > threshold) handlePreviousPage();
        else animate(y, -currentPage * window.innerHeight, {
            type: "spring",
            stiffness: 280,
            damping: 26,
        })
    };

    const handleWheel = (e: WheelEvent) => {
        if (scrollLock.current) return;

        const threshold = 40;

        if (e.deltaY > threshold && pageRef.current < feedLengthRef.current - 1) {
            setCurrentPage((p: number) => p + 1);
        } else if (e.deltaY < -threshold && pageRef.current > 0) {
            setCurrentPage((p: number) => p - 1);
        }

        scrollLock.current = true;
        scrollTimeout.current = setTimeout(() => {
            scrollLock.current = false;
        }, 450);
    };

    const pageRef = useRef(currentPage);
    const feedLengthRef = useRef(feed.length);

    useEffect(() => {
        pageRef.current = currentPage;
        feedLengthRef.current = feed.length;
    }, [currentPage, feed.length]);

    useEffect(() => {
        animate(y, -currentPage * window.innerHeight, {
            type: "spring",
            stiffness: 280,
            damping: 26,
        });
    }, [currentPage])

    return {
        handleDragEnd,
        handleWheel,
        scrollLock,
        scrollTimeout,
        y
    }
}