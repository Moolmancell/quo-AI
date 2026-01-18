'use client'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
    DrawerTrigger
} from '@/components/ui/Drawer'
import { Button } from '../ui/Button'
import { SendIcon } from 'lucide-react'
import { CopyIcon } from 'lucide-react'
import { Download } from 'lucide-react'
import { Share2 } from 'lucide-react'
import { MobileView } from 'react-device-detect'
import { ShareCard } from './ShareCard'
import { FeedContentProps } from '@/interfaces/feed/FeedContentProps';
import { useRef } from 'react'
import { useShareQuote } from '@/hooks/feed/useShareQuote'
interface ShareCardProps extends FeedContentProps {
    relativeTime: string;
    faviconImage: string | null;
    featuredImage: string | null;
}

export function ShareDrawer({ datePublished, relativeTime, author, src, publication, quote, faviconImage, featuredImage }: ShareCardProps) {

    const cardRef = useRef<HTMLDivElement>(null);
    const { handleShare, handleDownload, handleCopy } = useShareQuote();

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon-sm"><SendIcon /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Share</DrawerTitle>
                        <DrawerDescription>Choose how you'd like to share this content.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="mt-3 flex flex-col gap-2">
                            {/* Sharing options go here */}
                            <div className='absolute -left-2499.75'>
                                <ShareCard
                                    ref={cardRef}
                                    datePublished={datePublished}
                                    relativeTime={relativeTime}
                                    author={author}
                                    src={src}
                                    publication={publication}
                                    quote={quote}
                                    faviconImage={faviconImage}
                                    featuredImage={featuredImage}
                                />
                            </div>
                            <Button className='w-full' onClick={() => cardRef.current && handleDownload(cardRef as React.RefObject<HTMLDivElement>)}>
                                <Download className='mr-2 h-4 w-4' />
                                Download Image
                            </Button>
                            <MobileView>
                                <Button className='w-full' onClick={() => cardRef.current && handleShare(cardRef as React.RefObject<HTMLDivElement>)}>
                                    <Share2 className='mr-2 h-4 w-4' />
                                    Share
                                </Button>
                            </MobileView>
                            <Button variant='secondary' className='w-full' onClick={() =>  handleCopy(quote)}>
                                <CopyIcon className='mr-2 h-4 w-4' />
                                Copy Quote
                            </Button>
                        </div>
                    </div>
                    <DrawerFooter>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}