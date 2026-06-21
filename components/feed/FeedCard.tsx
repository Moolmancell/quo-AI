'use client'

import formatSmartDate from "@/utils/smart_date_format";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Skeleton } from "../ui/Skeleton";
import { Globe } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/Card"
import { Button } from "../ui/Button";
import { Bookmark, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Toggle } from "../ui/Toggle";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";
import { ShareDrawer } from "./ShareDrawer";
import { Thumbnail } from "../thumbnail/Thumbnail";
interface FeedCardProps extends FeedContentProps {
    isBookmarked?: boolean
    toggleBookmark: () => void
}

export function FeedCard({ id, datePublished, author, src, publication, quote, thumbnail, favicon, isBookmarked, toggleBookmark }: FeedCardProps) {
    // Initialize states as null or undefined rather than strings to make logic cleaner

    const relativeTime = formatSmartDate(datePublished);

    return (
        <Card className="font-sans border rounded-3xl w-full p-0 max-w-96 gap-0 shadow-none hover:shadow-2xl">
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
                    <Thumbnail src={thumbnail} favicon={favicon} />
                </div>

                {/* Content Section */}
                <div className="p-3">
                    <p
                        className="text-xs sm:text-sm font-normal text-card-foreground mb-4 line-clamp-5"
                        dangerouslySetInnerHTML={{ __html: quote }}
                    />
                    <p className="text-xs font-normal text-muted-foreground">{publication}</p>
                </div>
            </CardContent>



            <CardFooter className="p-3">
                <div className="w-full flex flex-row justify-between">
                    <div>
                        <Toggle
                            size="sm"
                            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
                            pressed={isBookmarked}
                            onPressedChange={() => {
                                console.log("change")
                                toggleBookmark()
                            }}
                        >
                            <Bookmark />
                        </Toggle>
                        <ShareDrawer
                            id={id}
                            datePublished={datePublished}
                            relativeTime={relativeTime}
                            author={author}
                            src={src}
                            publication={publication}
                            quote={quote}
                            favicon={favicon}
                            thumbnail={thumbnail}
                        />
                    </div>

                    <div>
                        <Button asChild variant="ghost" size="icon-sm"><Link target="_blank" href={src}><ExternalLink /></Link></Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}