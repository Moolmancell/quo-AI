'use client'

import { AspectRatio } from "@/components/ui/AspectRatio";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Globe } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/Card"
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";
import Logo from "../brand/Logo";

interface ShareCardProps extends FeedContentProps {
    relativeTime: string;
    faviconImage: string | null;
    featuredImage: string | null;
    className?: string;
}

export function ShareCard({ className, datePublished, relativeTime, author, src, publication, quote, faviconImage, featuredImage } : ShareCardProps) {

    return (
        <Card className={`${className} font-sans rounded-none p-0 w-96 gap-0 shadow-none hover:shadow-2xl`}>
            {/* Header: Avatar and Metadata */}
            <CardHeader className="flex items-center gap-2.5 p-3">
                <Avatar className='size-8'>
                    <AvatarImage src={faviconImage || ""} alt={publication} />
                    <AvatarFallback><Globe className="size-4 text-muted" /></AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xs sm:text-sm font-medium text-foreground mb-1 leading-none">{author}</h2>
                    <p className="text-xs text-muted-foreground">{relativeTime}</p>
                </div>
            </CardHeader>



            <CardContent className="p-0">
                {/* Featured Image Section */}
                <div className="overflow-hidden border bg-muted">
                    <AspectRatio ratio={4 / 3}>
                            <Image
                                src={featuredImage || ""}
                                alt="Featured Image"
                                fill
                                className="transition-opacity duration-300"
                                style={{ objectFit: 'cover' }}
                            />
                    </AspectRatio>
                </div>

                {/* Content Section */}
                <div className="p-3">
                    <p className="text-xs sm:text-sm font-normal text-card-foreground mb-4">"{quote}"</p>
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