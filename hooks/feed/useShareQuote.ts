import * as htmlToImage from 'html-to-image';

export function useShareQuote() {
    const handleShare = async (cardRef: React.RefObject<HTMLDivElement>) => {
        if (cardRef.current === null) return;

        // Convert HTML element to a PNG data URL
        const dataUrl = await htmlToImage.toPng(cardRef.current, { cacheBust: true });

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
            link.download = 'my-image.png';
            link.href = dataUrl;
            link.click();
        }
    };

    const handleDownload = async (elementRef: React.RefObject<HTMLDivElement>) => {
        if (elementRef.current === null) return;

        try {
            // 1. Generate the image as a PNG Data URL
            const dataUrl = await htmlToImage.toPng(elementRef.current, {
                cacheBust: true,
                pixelRatio: 2, // Keeps text sharp (Retina/High DPI)
            });

            // 2. Create a temporary anchor element
            const link = document.createElement('a');
            link.download = 'my-custom-image.png'; // The name of the file
            link.href = dataUrl;

            // 3. Trigger the click and clean up
            document.body.appendChild(link); // Required for Firefox compatibility
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            console.error('Failed to download image:', err);
        }
    };

    return {
        handleShare,
        handleDownload
    }
}