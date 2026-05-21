"use client"

import { useRecentSearch } from "@/hooks/search/useRecentSearch"
import { useRouter } from "next/navigation"
import { RecentSearches } from "@/components/search/RecentSearches";
import { SearchResultsPage } from "@/components/search/SearchResults";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
    const { recentSearches, status, refetch, clearSearches, deleteSearch } = useRecentSearch();
    const searchParams = useSearchParams();
    const search = searchParams.get('q') || '';

    return (
        <>
            {
                search ? (
                    <SearchResultsPage search={search} />
                ) : (
                    <RecentSearches
                        recentSearches={recentSearches}
                        status={status}
                        refetch={refetch}
                        clearSearches={clearSearches}
                        deleteSearch={deleteSearch}
                    />
                )
            }
        </>
    )
}