import { SearchResultsArticle } from "./SearchResultsArticle";
import { SearchResultsQuotes } from "./SearchResultsQuotes";
import { useSearchParams } from "next/navigation";

export function SearchResults({search}: {search: string}) {
    const searchParams = useSearchParams();
    const searchType = searchParams.get('type') || 'Articles/Essays';

    return searchType === "Quotes" ? <SearchResultsQuotes search={search} /> : <SearchResultsArticle search={search} />
}