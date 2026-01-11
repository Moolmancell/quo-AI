import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { FeedCard } from "./FeedCard";
import { FeedContentProps } from "@/interfaces/feed/FeedContentProps";

function FeedItem({ item, index, height, toggleBookmarkDoubleClick, toggleBookmark, bookmarkedUrls } : {
    item: FeedContentProps,
    index: number,
    height: number,
    toggleBookmarkDoubleClick: (src: string) => void,
    toggleBookmark: (src: string) => void,
    bookmarkedUrls: any
}) {
  const [showBookmark, setShowBookmark] = useState(false);

  const handleDoubleClick = () => {
    toggleBookmarkDoubleClick(item.src);
    setShowBookmark(true);

    setTimeout(() => setShowBookmark(false), 700);
  };

  return (
    <motion.div
      key={index}
      style={{ top: index * height }}
      className="absolute w-full h-dvh flex items-center justify-center p-4"
      onDoubleClick={handleDoubleClick}
    >
      {/* Bookmark Animation */}
      <AnimatePresence>
        {showBookmark && (
          <motion.div
            className="fixed top-1/2 -translate-y-1/2 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Bookmark className="size-20 text-white fill-white drop-shadow-md" />
          </motion.div>
        )}
      </AnimatePresence>

      <FeedCard {...item} isBookmarked={bookmarkedUrls.has(item.src)} toggleBookmark={toggleBookmark}/>
    </motion.div>
  );
}
