"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useRecentSearch } from "@/hooks/search/useRecentSearch"
import { Skeleton } from "@/components/ui/Skeleton"
import { RotateCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { XIcon } from "lucide-react"

export function RecentSearches({recentSearches, status, refetch, clearSearches, deleteSearch} : {
    recentSearches: string[];
    status: "idle" | "loading" | "success" | "error";
    refetch: () => void;
    clearSearches: () => void;
    deleteSearch: (search: string) => void;
}) {
    const router = useRouter();

    return (
        <>
            {/* Recent Searches Section */}
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-foreground tracking-tight">Recent Searches</h2>
                    {status === "success" && recentSearches.length > 0 && (
                        <button
                            onClick={clearSearches}
                            className="text-sm font-medium underline decoration-1 underline-offset-4 hover:text-primary transition-colors cursor-pointer"
                        >
                            Clear Searches
                        </button>
                    )}
                </div>

                {status === "loading" && (
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className="h-6 w-20 rounded-lg" />
                        ))}
                    </div>
                )}

                {status === "error" && (
                    <div className="text-center">
                        <h3 className="text-sm center text-destructive mb-2">Failed to load recent searches. Please try again.</h3>
                        <Button variant="outline" onClick={refetch}>
                            <RotateCw />
                            Try Again
                        </Button>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-wrap gap-2">
                        {recentSearches.length > 0 ? (
                            recentSearches.map((search) => (
                                <div
                                    onClick={() => router.push(`/feed/search?q=${encodeURIComponent(search)}`)}
                                    key={search}
                                    className="flex flex-row items-center h-6 pl-2 pr-1 rounded-[8px] text-xs cursor-pointer font-semibold bg-[#EFEBE7] hover:bg-[#E5E1DD] text-[#282F3E] border-none shadow-none transition-colors group"
                                >
                                    {search}
                                    <button
                                        className="ml-2 p-0.5 rounded-sm hover:bg-black/5 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSearch(search);
                                        }}
                                    >
                                        <XIcon className="size-3 text-muted-foreground group-hover:text-foreground" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground italic">No recent searches</p>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}