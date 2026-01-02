"use client";

import axios from 'axios';
// Removed 'import { stat } from 'fs';' - fs doesn't work in client components
import { useState, useEffect, useRef } from 'react';
import { WentWrong } from '@/components/error/WentWrong';
import { Spinner } from '@/components/ui/Spinner';
import { FeedCard } from '@/components/feed/FeedCard';
import { motion, useMotionValue, animate, PanInfo } from "motion/react"
import { Button } from '@/components/ui/Button';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface FeedContentProps {
    datePublished: string,
    author: string,
    src: string,
    publication: string,
    quote: string
}

export default function FeedPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [feed, setFeed] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const scrollLock = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const height = typeof window !== "undefined"
        ? window.innerHeight
        : 0;
    const y = useMotionValue(0);

    const visibleFeed = feed.slice(
        Math.max(0, currentPage - 1),
        Math.min(feed.length, currentPage + 2)
    );


    console.log(currentPage)
    console.log(feed.length)

    const handleNextPage = () => {
        if (currentPage < feed.length - 1) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1)
        }
    }

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
            setCurrentPage((p) => p + 1);
        } else if (e.deltaY < -threshold && pageRef.current > 0) {
            setCurrentPage((p) => p - 1);
        }

        scrollLock.current = true;
        scrollTimeout.current = setTimeout(() => {
            scrollLock.current = false;
        }, 450);
    };



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
        animate(y, -currentPage * window.innerHeight, {
            type: "spring",
            stiffness: 280,
            damping: 26,
        });
    }, [currentPage]);

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

    const pageRef = useRef(currentPage);
    const feedLengthRef = useRef(feed.length);

    useEffect(() => {
        pageRef.current = currentPage;
        feedLengthRef.current = feed.length;
    }, [currentPage, feed.length]);

    useEffect(() => {
        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);


    if (status === 'loading') {
        return <Spinner className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8" />;
    }

    if (status === 'error') {
        return (
            <WentWrong
                onClick={fetchFeed}
                className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
        );
    }

    return (
        <>
            <div className='hidden sm:flex flex-col gap-4 fixed right-4 top-1/2 -translate-y-1/2 z-50'>
                <Button size="icon-lg" onClick={handlePreviousPage} disabled={currentPage <= 0}><ArrowUp /></Button>
                <Button variant={isFetchingMore ? "ghost" : "default"} size="icon-lg" onClick={handleNextPage} disabled={isFetchingMore}>
                    {isFetchingMore ? <Spinner /> : <ArrowDown />}
                </Button>
            </div>

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
        </>
    );
}