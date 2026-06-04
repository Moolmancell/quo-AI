import { useState } from "react";
import axios from "@/lib/axios";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

export function useBookmarks() {
    const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());

    type BookmarkAction = "add" | "remove";

    const syncBookmark = async (item: FeedContentProps, action: BookmarkAction) => {
        try {
            if (action === "add") {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/feed/add-bookmark`,
                    { quoteId: item.id }
                );
            } else {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/feed/delete-bookmark`,
                    { data: { id: item.id } }
                );
            }
        } catch (e) {
            console.error("Bookmark sync failed", e);
            setBookmarkedUrls(prev => {
                const next = new Set(prev);
                action === "add"
                    ? next.delete(item.id)
                    : next.add(item.id);
                return next;
            });
        }
    };


    const toggleBookmark = (item: FeedContentProps) => {
        const isBookmarked = bookmarkedUrls.has(item.id);
        const action: BookmarkAction = isBookmarked ? "remove" : "add";

        setBookmarkedUrls(prev => {
            const next = new Set(prev);
            if (action === "remove") {
                next.delete(item.id);
            } else {
                next.add(item.id);
            }
            return next;
        });

        syncBookmark(item, action);
    };

    const toggleBookmarkDoubleClick = (item: FeedContentProps) => {
        if (bookmarkedUrls.has(item.id)) return;

        setBookmarkedUrls(prev => {
            const next = new Set(prev);
            next.add(item.id);
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