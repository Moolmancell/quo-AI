'use client'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/Card"
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";
import Logo from "../brand/Logo";
import dayjs from "dayjs";

interface ShareCardProps extends FeedContentProps {
    relativeTime: string;
    className?: string;
    ref?: any;
}

export function ShareCard({ ref, className, datePublished, relativeTime, author, src, publication, quote, favicon, thumbnail }: ShareCardProps) {

    return (
        <Card ref={ref} className={`${className} font-sans rounded-none p-0 w-96 gap-0 shadow-none hover:shadow-2xl`}>
            {/* Header: Avatar and Metadata */}
            <CardHeader className="flex items-center gap-2.5 p-3">
                <div>
                    <h2 className="text-xs sm:text-sm font-medium text-foreground mb-1 leading-none">{author}</h2>
                    <p className="text-xs text-muted-foreground">{dayjs(datePublished).format('MMMM D, YYYY')}</p>
                </div>
            </CardHeader>



            <CardContent className="p-0">
                {/* Featured Image Section */}

                {/* Content Section */}
                <div className="p-3">
                    <p
                        className="text-md font-medium text-card-foreground mb-4 line-clamp-5"
                        dangerouslySetInnerHTML={{ __html: quote }}
                    />                    
                    <p className="text-xs font-normal text-muted-foreground">{publication}</p>
                </div>
            </CardContent>



            <CardFooter className="p-3">
                <div className="w-full flex flex-row items-center justify-center">
                    <Logo />
                </div>
            </CardFooter>
        </Card>
    )
}