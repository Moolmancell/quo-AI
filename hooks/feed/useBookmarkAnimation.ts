import { useState } from "react";

export function useBookmarkAnimation() {
    
     const [bookmarkVisible, setBookmarkVisible] = useState(false);
    
        const handleBookmarkAnimation = () => {
            setBookmarkVisible(true);
            setTimeout(() => setBookmarkVisible(false), 700)
        }
    
    return {
        bookmarkVisible,
        handleBookmarkAnimation
    }
} 