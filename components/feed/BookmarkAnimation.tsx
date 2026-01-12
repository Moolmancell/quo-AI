import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { Bookmark } from "lucide-react"

export function BookmarkAnimation({ bookmarkVisible }: { bookmarkVisible: boolean }) {

    if (typeof window !== undefined) {
        return createPortal(
            <AnimatePresence>
                {bookmarkVisible &&
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                        key='bookmark'
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 3.5 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <Bookmark
                            className="fill-white text-white  drop-shadow-md"
                        />
                    </motion.div>
                }
            </AnimatePresence>
            ,
            document.body
        )
    }


}