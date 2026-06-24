'use client'

import formatSmartDate from "@/utils/smart_date_format";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Globe } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/Card"
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";
import { Thumbnail } from "../thumbnail/Thumbnail";
interface FeedCardProps extends FeedContentProps {
    isBookmarked?: boolean
    toggleBookmark: () => void
}

interface SearchQuotesCardProps {
    id: string;
    datePublished: string;
    publication: string;
    author: string;
    src: string;
    quote: string;
    thumbnail: string;
    favicon: string;
}

export function SearchQuotesCard({ id, datePublished, author, src, publication, quote, thumbnail, favicon}: SearchQuotesCardProps) {
    // Initialize states as null or undefined rather than strings to make logic cleaner

    const relativeTime = formatSmartDate(datePublished);

    return (
        <Card className="font-sans border rounded-3xl w-full p-0 gap-0 shadow-none hover:shadow-2xl">
            {/* Header: Avatar and Metadata */}
            <CardHeader className="flex items-center gap-2.5 p-3">
                <Avatar className='size-8'>
                    <AvatarImage src={favicon || ""} alt={publication} />
                    <AvatarFallback><Globe className="size-4 text-muted-foreground" /></AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xs sm:text-sm font-medium text-foreground mb-1 leading-none">{author}</h2>
                    <p className="text-xs text-muted-foreground">{relativeTime}</p>
                </div>
            </CardHeader>



            <CardContent className="p-0">
                {/* Featured Image Section */}
                <div className="overflow-hidden border bg-muted">
                    <Thumbnail ratio={16/9} src={thumbnail} favicon={favicon} />
                </div>

                {/* Content Section */}
                <div className="p-3">
                    <p
                        className="text-xs sm:text-sm font-normal text-card-foreground mb-4 line-clamp-5"
                        dangerouslySetInnerHTML={{ __html: quote }}
                    />
                    <p className="text-xs font-normal text-muted-foreground pb-3">{publication}</p>
                </div>
            </CardContent>

            
        </Card>
    )
}