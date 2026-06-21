import { useRef, useEffect, useCallback } from "react";
import { SearchArticleCard } from "./SearchArticleCard";
import { Spinner } from "@/components/ui/Spinner";
import { useSearchArticles } from "@/hooks/search/useSearchArticles";
import { WentWrong } from "@/components/error/WentWrong";

export function SearchResultsArticle({search}: {search: string}) {

    const { searchResultsArticles, status, fetchMore, isFetchingMore, hasMore, retry } = useSearchArticles({ search });

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
                    {searchResultsArticles.map((article: any) => (
                        <li key={article.id}>
                            <SearchArticleCard
                                article={article}
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
            {status === "success" && !hasMore && searchResultsArticles.length > 0 && (
                <p className="text-center text-muted-foreground mt-6 text-sm">
                    No more articles
                </p>
            )}
        </div>
    )
}