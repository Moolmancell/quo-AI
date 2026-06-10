"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/Button";
import { SearchIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"


export default function SearchLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get("q") || "";
    const currentType = searchParams.get("type") || "Articles/Essays";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("q");
        const type = formData.get("type") || "Articles/Essays";

        if (typeof query === "string" && query.trim()) {
            router.push(`/feed/search?q=${encodeURIComponent(query)}&type=${encodeURIComponent(type as string)}`);
        }
    };

    return (
        <div className="flex flex-col gap-8 px-4 py-8 md:px-8 max-w-3xl mx-auto">
            {/* Search Input Container */}
            <form onSubmit={handleSubmit}>
                <div className="relative group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground transition-colors group-focus-within:text-primary pointer-events-none" />
                    <Input
                        type="text"
                        name="q"
                        defaultValue={currentQuery}
                        placeholder="Search for Topics"
                        className="pl-12 h-12 rounded-full bg-[#FDFDFC] dark:bg-input/10 border-[#DDDAD4] dark:border-border text-base shadow-none focus-visible:ring-1 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {
                            currentQuery ? (
                                <Button
                                    type="button"
                                    onClick={() => router.push('/feed/search')}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <XIcon className="size-4" />
                                </Button>
                            ) : (
                                <Button type="submit" variant="default" size="icon">
                                    <SearchIcon className="size-4" />
                                </Button>
                            )
                        }
                    </div>
                    <Select defaultValue="Articles/Essays" name="type" onValueChange={(val) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("type", val);
                        router.replace(`/feed/search?${params.toString()}`);
                    }}>
                        <SelectTrigger className="absolute right-12 top-1/2 -translate-y-1/2 border-none focus:ring-0">
                            <SelectValue placeholder="Search" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm p-1">
                            <SelectGroup>
                                <SelectItem value="Quotes">Quotes</SelectItem>
                                <SelectItem value="Articles/Essays">Articles/Essays</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </form>

            {children}
        </div>
    )
}