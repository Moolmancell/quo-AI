'use client'

import formatSmartDate from "@/utils/smart_date_format";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Skeleton } from "../ui/Skeleton";
import axios from "axios";
import { Globe } from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"
import { Button } from "../ui/Button";
import { Bookmark, SendIcon, ExternalLink, Info } from "lucide-react";
import Link from "next/link";

interface FeedCardProps {
    datePublished: string,
    author: string,
    src: string,
    publication: string,
    quote: string
}

export function FeedCard({ datePublished, author, src, publication, quote }: FeedCardProps) {
    // Initialize states as null or undefined rather than strings to make logic cleaner
    const [featuredImage, setFeaturedImage] = useState<string | null>(null);
    const [faviconImage, setFaviconImage] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    const relativeTime = formatSmartDate(datePublished);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setStatus('loading');
                const [imgRes, favRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-featured-image`, { params: { url: src } }),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-favicon-image`, { params: { url: src } })
                ]);
                setFeaturedImage(imgRes.data.featuredImageUrl || 'error');
                setFaviconImage(favRes.data.faviconImageUrl || 'error');
                setStatus('success');
            } catch (error) {
                console.error('Error fetching card data:', error);
                setStatus('error');
            }
        };

        fetchData();
    }, [src]);

    return (
        <Card className="font-sans border rounded-3xl w-full p-0 max-w-96 gap-0 shadow-none hover:shadow-2xl">
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
                        {status === 'loading' ? (
                            <Skeleton className="h-full w-full" />
                        ) : status === 'error' || !featuredImage || featuredImage === 'error' ? (
                            <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                                <p className="text-xs">Image unavailable</p>
                            </div>
                        ) : (
                            <Image
                                src={featuredImage}
                                alt="Featured Image"
                                fill
                                className="transition-opacity duration-300"
                                style={{ objectFit: 'cover' }}
                                // Optional: handle broken individual images
                                onError={() => setFeaturedImage('error')}
                            />
                        )}
                    </AspectRatio>
                </div>

                {/* Content Section */}
                <div className="p-3">
                    <p className="text-xs sm:text-sm font-normal text-card-foreground mb-4">"{quote}"</p>
                    <p className="text-xs font-normal text-muted-foreground">{publication}</p>
                </div>
            </CardContent>



            <CardFooter className="p-3">
                <div className="w-full flex flex-row justify-between">
                    <div>
                        <Button variant="ghost" size="icon-sm"><Bookmark /></Button>
                        <Button variant="ghost" size="icon-sm"><SendIcon /></Button>
                        <Button asChild variant="ghost" size="icon-sm"><Link target="_blank" href={src}><ExternalLink /></Link></Button>
                    </div>

                    <div>
                        <Button variant="ghost" size="icon-sm"><Info /></Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}