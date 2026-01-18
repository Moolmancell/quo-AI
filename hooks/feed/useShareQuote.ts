import * as htmlToImage from 'html-to-image';
import { toast } from 'sonner';

export function useShareQuote() {
    const handleShare = async (cardRef: React.RefObject<HTMLDivElement>) => {
        if (cardRef.current === null) return;

        // Wait for images to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Convert HTML element to a PNG data URL
        const dataUrl = await htmlToImage.toPng(cardRef.current, { 
            cacheBust: true,
            pixelRatio: 2
        });

        // Use Web Share API if supported by the browser
        if (navigator.share) {
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'share.png', { type: 'image/png' });

            try {
                await navigator.share({
                    files: [file],
                    title: 'Check this out!',
                });
            } catch (err) {
                console.error("Share failed", err);
            }
        } else {
            // Fallback: Trigger a download if Share API isn't available
            const link = document.createElement('a');
            link.download = 'quote.png';
            link.href = dataUrl;
            link.click();
        }
    };

    const handleDownload = async (elementRef: React.RefObject<HTMLDivElement>) => {
        if (elementRef.current === null) return;

        try {
            // Wait for images to load
            await new Promise(resolve => setTimeout(resolve, 500));

            const dataUrl = await htmlToImage.toPng(elementRef.current, {
                pixelRatio: 2
            });
            
            const link = document.createElement('a');
            link.download = 'quote.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image:', err);
        }
    };

    return {
        handleShare,
        handleDownload
    }
}