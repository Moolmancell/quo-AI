'use client'

import { AspectRatio } from "@/components/ui/AspectRatio";
import Image from "next/image"
import { useState } from "react";

export function Thumbnail({ src, favicon }: { src: string, favicon: string }) {

    const [errorLoadingImage, setErrorLoadingImage] = useState(false);
    const [errorLoadingFavicon, setErrorLoadingFavicon] = useState(false);

    return (
        <div className="overflow-hidden border bg-muted">
            <AspectRatio ratio={4 / 3}>
                {
                    errorLoadingImage && errorLoadingFavicon ? (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square inset-0 w-1/3 flex items-center justify-center text-sm text-muted-foreground">
                            No Images Found
                        </div>

                    ) : errorLoadingImage ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={favicon}
                                alt="Favicon"
                                fill
                                className="transition-opacity duration-300 blur-lg"
                                style={{ objectFit: 'cover' }}
                                onError={() => setErrorLoadingFavicon(true)}
                            />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square inset-0 w-1/3 flex items-center justify-center text-sm text-muted-foreground">
                                <Image
                                    src={favicon}
                                    alt="Favicon"
                                    fill
                                    className="transition-opacity drop-shadow-lg duration-300 rounded-2xl"
                                    style={{ objectFit: 'cover' }}
                                    onError={() => setErrorLoadingFavicon(true)}
                                />
                            </div>
                        </div>
                    ) : (
                        <Image
                            src={src}
                            alt="Featured Image"
                            fill
                            className="transition-opacity duration-300"
                            style={{ objectFit: 'cover' }}
                            onError={() => setErrorLoadingImage(true)}
                        />
                    )
                }

            </AspectRatio>
        </div>
    )
}