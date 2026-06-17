import { SearchArticleCard } from "./SearchArticleCard";

export function SearchResults({search}: {search: string}) {
    
    
    
    return (
        <div>
            Search Results for "{search}"
            <SearchArticleCard article={{id: "1",
                    title: "The Philosophy of Programming",
                    author: "Jane Doe",
                    publication: "Tech Today",
                    datePublished: "2025-01-15",
                    snippet: "In 2026, the hype for artificial intelligence agents is louder than ever before. These semi-autonomous programs can “think” and execute well-defined tasks in areas like customer service and software development, typically using language models (LMs). But fields like medical diagnosis and scientific discovery require them to inquire about a vast range of solutions in uncertain environments, which LMs struggle with.",
                    src: "https://example.com/article-1",
                    favicon: "https://picsum.photos/400",
                    thumbnail: "https://picsum.photos/400",
                }} />
        </div>
    )
}