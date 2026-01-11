import { useState } from "react";

export function useBookmarks() {
    const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());

    const toggleBookmark = (url: string) => {
        setBookmarkedUrls((prev) => {
            const next = new Set(prev);
            if (next.has(url)) {
                next.delete(url);
            } else {
                next.add(url);
            }
            return next;
        });
    };

    const toggleBookmarkDoubleClick = (url: string) => {
        setBookmarkedUrls((prev) => {
            const next = new Set(prev);
            if (next.has(url)) {
                return next;
            } else {
                next.add(url);
            }
            return next;
        });
    };

    return {
        bookmarkedUrls,
        setBookmarkedUrls,
        toggleBookmark,
        toggleBookmarkDoubleClick
    }
}