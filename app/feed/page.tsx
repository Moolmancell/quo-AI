"use client";

// Removed 'import { stat } from 'fs';' - fs doesn't work in client components
import { useEffect } from 'react';
import { WentWrong } from '@/components/error/WentWrong';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useFeedData } from '@/hooks/feed/useFeedData';
import { useFeedExtends } from '@/hooks/feed/useFeedExtends';
import { useFeedPage } from "@/hooks/feed/useFeedPage"
import { useFeedGesture } from '@/hooks/feed/useFeedGestures';
import { FeedView } from '@/components/feed/FeedView';

export default function FeedPage() {
    const { feed, fetchFeed, refetchFeed, status, isFetchingMore, setIsFetchingMore } = useFeedData()
    const { currentPage, setCurrentPage, handlePreviousPage, handleNextPage } = useFeedPage({ feed });
    const { scrollTimeout, handleWheel, handleDragEnd, y } = useFeedGesture({
        handleNextPage, 
        handlePreviousPage, 
        currentPage, 
        setCurrentPage, 
        feed
    })

    console.log(currentPage)
    console.log(feed.length)

    useEffect(() => {
        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    useFeedExtends({
        currentPage,
        isFetchingMore,
        setIsFetchingMore,
        refetchFeed,
        feed,
    })

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

            <FeedView 
                handleDragEnd={handleDragEnd}
                currentPage={currentPage}
                isFetchingMore={isFetchingMore}
                feed={feed}
                y={y}
            />
        </>
    );
}