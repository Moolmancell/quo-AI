import { useState } from "react";
import axios from "axios";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function useBookmarks() {
    const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());

    type BookmarkAction = "add" | "remove";

    const syncBookmark = async (item: FeedContentProps, action: BookmarkAction) => {
        try {
            if (action === "add") {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/add-bookmark`,
                    { item }
                );
            } else {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/delete-bookmark`,
                    { data: item.src }
                );
            }
        } catch (e) {
            console.error("Bookmark sync failed", e);
            setBookmarkedUrls(prev => {
                const next = new Set(prev);
                action === "add"
                    ? next.delete(item.src)
                    : next.add(item.src);
                return next;
            });
        }
    };


    const toggleBookmark = (item: FeedContentProps) => {
        const isBookmarked = bookmarkedUrls.has(item.src);
        const action: BookmarkAction = isBookmarked ? "remove" : "add";

        setBookmarkedUrls(prev => {
            const next = new Set(prev);
            if (action === "remove") {
                next.delete(item.src);
            } else {
                next.add(item.src);
            }
            return next;
        });

        syncBookmark(item, action);
    };

    const toggleBookmarkDoubleClick = (item: FeedContentProps) => {
        if (bookmarkedUrls.has(item.src)) return;

        setBookmarkedUrls(prev => {
            const next = new Set(prev);
            next.add(item.src);
            return next;
        });

        syncBookmark(item, "add");
    };

    return {
        bookmarkedUrls,
        setBookmarkedUrls,
        toggleBookmark,
        toggleBookmarkDoubleClick,
    }
}