import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { FeedCard } from "@/components/feed/FeedCard";
import { motion } from "motion/react"
import { VisuallyHidden } from "radix-ui";

export function DialogQuoteCard({ quote, children }: { quote?: any; children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger className="text-left w-full hover:brightness-95">{children}</DialogTrigger>
            <DialogContent className="p-0 shadow-2xl bg-none">
                <VisuallyHidden.Root asChild>
                    <DialogTitle>{quote.quote || "Quote"}</DialogTitle>
                </VisuallyHidden.Root>
                    <FeedCard
                        id={quote.id}
                        datePublished={quote.datePublished}
                        publication={quote.publication}
                        author={quote.author}
                        src={quote.src}
                        quote={quote.quote}
                        thumbnail={quote.thumbnail}
                        favicon={quote.favicon}
                        toggleBookmark={() => { }}
                    />
            </DialogContent>
        </Dialog>
    )
}