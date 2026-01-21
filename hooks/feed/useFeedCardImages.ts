import { useEffect, useState } from "react"
import axios from "axios"

export function useFeedCardImages(src: string) {

    const [featuredImage, setFeaturedImage] = useState<string | null>(null);
    const [faviconImage, setFaviconImage] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    const fetchData = async () => {
        try {
            setStatus('loading');
            const [imgRes, favRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/get-featured-image`, { params: { url: src } }),
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/get-favicon-image`, { params: { url: src } })
            ]);
            setFeaturedImage(imgRes.data.featuredImageUrl || 'error');
            setFaviconImage(favRes.data.faviconImageUrl || 'error');
            setStatus('success');
        } catch (error) {
            console.error('Error fetching card data:', error);
            setStatus('error');
        }
    };

    useEffect(() => {
        fetchData();
    }, [src]);

    return { featuredImage, faviconImage, status };

}