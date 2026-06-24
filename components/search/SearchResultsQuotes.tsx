import { useRef, useEffect, useCallback } from "react";
import { SearchQuotesCard } from "./SearchQuotesCard";
import { Spinner } from "@/components/ui/Spinner";
import { WentWrong } from "@/components/error/WentWrong";
import { useSearchQuotes } from "@/hooks/search/useSearchQuotes";

export function SearchResultsQuotes({search}: {search: string}) {

    const { searchResultsQuotes, status, fetchMore, isFetchingMore, hasMore, retry } = useSearchQuotes({ search });

    const sentinelRef = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                fetchMore();
            }
        },
        [fetchMore]
    );

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el || status !== "success") return;

        const observer = new IntersectionObserver(handleObserver, {
            rootMargin: "200px",
        });
        observer.observe(el);

        return () => observer.disconnect();
    }, [handleObserver, status]);

    return (
        <div className="relative">
            {status === "loading" && <Spinner className="m-auto size-6 mt-10" />}
            {status === "success" && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchResultsQuotes.map((quote: any) => (
                        <li key={quote.id}>
                            <SearchQuotesCard
                                id={quote.id}
                                datePublished={quote.datePublished}
                                publication={quote.publication}
                                author={quote.author}
                                src={quote.src}
                                quote={quote.quote}
                                thumbnail={quote.thumbnail}
                                favicon={quote.favicon}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {status === "error" && <WentWrong onClick={() => retry()} />}

            <div ref={sentinelRef} className="h-px" />

            {status === "success" && isFetchingMore && (
                <Spinner className="m-auto size-6 mt-6" />
            )}
            {status === "success" && !hasMore && searchResultsQuotes.length > 0 && (
                <p className="text-center text-muted-foreground mt-6 text-sm">
                    No more quotes
                </p>
            )}
        </div>
    )
}