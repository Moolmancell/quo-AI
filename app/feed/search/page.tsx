"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

const INITIAL_RECENT_SEARCHES = [
    "Philosophy",
    "Programming",
    "Addiction",
    "Researching",
    "Animals",
    "Star Wars",
    "Elden Ring",
    "Video Games"
]

export default function SearchPage() {
    const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES)

    const handleClearSearches = () => {
        setRecentSearches([])
    }

    return (
        <div className="flex flex-col gap-8 px-4 py-8 md:px-8 max-w-3xl mx-auto">
            {/* Search Input Container */}
            <div className="relative group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground transition-colors group-focus-within:text-primary pointer-events-none" />
                <Input
                    type="text"
                    placeholder="Search for Topics"
                    className="pl-12 h-12 rounded-full bg-[#FDFDFC] dark:bg-input/10 border-[#DDDAD4] dark:border-border text-base shadow-none focus-visible:ring-1 transition-all"
                />
            </div>

            {/* Recent Searches Section */}
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-foreground tracking-tight">Recent Searches</h2>
                    {recentSearches.length > 0 && (
                        <button
                            onClick={handleClearSearches}
                            className="text-sm font-medium underline decoration-1 underline-offset-4 hover:text-primary transition-colors cursor-pointer"
                        >
                            Clear Searches
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {recentSearches.length > 0 ? (
                        recentSearches.map((search) => (
                            <Button
                                key={search}
                                variant="secondary"
                                size="sm"
                                className="h-8 px-4 rounded-lg text-xs font-semibold bg-[#EFEBE7] hover:bg-[#E5E1DD] text-[#282F3E] border-none shadow-none transition-colors"
                            >
                                {search}
                            </Button>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No recent searches</p>
                    )}
                </div>
            </div>
        </div>
    )
}