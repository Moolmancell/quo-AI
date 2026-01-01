"use client";

import axios from 'axios';
// Removed 'import { stat } from 'fs';' - fs doesn't work in client components
import { useState, useEffect } from 'react';
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
    const height = typeof window !== "undefined"
        ? window.innerHeight
        : 0;
    const y = useMotionValue(0);
    
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
                <Button size="icon-lg" onClick={handlePreviousPage}><ArrowUp /></Button>
                <Button size="icon-lg" onClick={handleNextPage}><ArrowDown /></Button>
            </div>

            <motion.div
                drag="y"
                onDragEnd={handleDragEnd}
                dragConstraints={{
                    top: -(feed.length - 1) * height,
                    bottom: 0,
                }}
                dragElastic={0.12}
                dragMomentum={false}
                style={{ y }}
                className="flex flex-col fixed top-0 w-full"
            >

                {
                    feed.map((item, i) => (
                        <div
                            key={i}
                            className='flex flex-row items-center justify-center 
                        w-full h-dvh p-4
                        '
                        >
                            <FeedCard {...item} />
                        </div>
                    ))
                }
            </motion.div>
        </>
    );
}