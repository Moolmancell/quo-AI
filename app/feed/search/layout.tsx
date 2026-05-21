"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get("q") || "";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("q");
        
        if (typeof query === "string" && query.trim()) {
            router.push(`/feed/search/search-results?q=${encodeURIComponent(query)}`);
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
                </div>
            </form>

            {children}
        </div>
    )
}