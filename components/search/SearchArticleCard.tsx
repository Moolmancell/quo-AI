import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Thumbnail } from "@/components/thumbnail/Thumbnail"

interface SearchArticleCardProps {
    article: {
        id: string;
        title: string;
        author: string;
        publication: string;
        datePublished: string;
        snippet: string;
        src: string;
        favicon?: string;
        thumbnail?: string;
    }
}

export function SearchArticleCard({ article }: SearchArticleCardProps) {
    return (
        <Card className="p-0 flex flex-col gap-0 overflow-hidden border-[#DDDAD4] bg-[#FDFDFC] rounded-[24px] shadow-none">
            {/* Author Section */}
            <div className="flex items-center gap-[10px] p-3">
                <Avatar className="size-8">
                    <AvatarImage src={article.favicon || "/images/search/avatar-placeholder.png"} alt={article.publication || article.author} />
                    <AvatarFallback>{(article.publication || article.author)?.[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-[#1E232F] tracking-[0.015em]">
                    {article.publication || article.author}
                </span>
            </div>

            {/* Picture Section */}
            <div className="px-3">
                <div className="relative w-full rounded-sm overflow-hidden">
                    <Thumbnail
                        src={article.thumbnail || "/images/search/article-placeholder.png"}
                        favicon={article.favicon || "/images/search/avatar-placeholder.png"}
                        ratio={16 / 9}
                    />
                </div>
            </div>

            {/* Body Section */}
            <div className="flex flex-col gap-4 p-3">
                <h3 className="text-base font-semibold text-[#1E232F] leading-6">
                    {article.title}
                </h3>
                <p className="text-sm font-normal text-[#5C6270] leading-[21px] tracking-[0.005em] line-clamp-3">
                    {article.snippet}
                </p>
            </div>

            {/* Read More Section */}
            <div className="p-3">
                    <a className="w-fit p-2 h-auto hover:bg-transparent hover:underline text-xs font-semibold text-[#1E232F] tracking-[0.015em] flex justify-start gap-2" href={article.src} target="_blank" rel="noopener noreferrer">
                        Read More
                        <MoveRight className="size-[16.25px]" />
                    </a>
            </div>
        </Card>
    );
}
