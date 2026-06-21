import { SearchArticleCard } from "./SearchArticleCard";
import { Spinner } from "@/components/ui/Spinner";
import { useSearchArticles } from "@/hooks/search/useSearchArticles";
import { WentWrong } from "@/components/error/WentWrong";

export function SearchResultsArticle({search}: {search: string}) {
    
    const { searchResultsArticles, status, fetchSearchResults } = useSearchArticles({ search });

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
            {status === "error" && <WentWrong onClick={() => fetchSearchResults(search)} />}
        </div>
    )
}