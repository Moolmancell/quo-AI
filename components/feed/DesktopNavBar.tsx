"use client"

import { useEffect, useState, useMemo } from 'react'
import { Button } from '../ui/Button'
import { Toggle } from '../ui/Toggle'
import { HouseIcon, SearchIcon, MessageCirclePlus, Cog, BookmarkIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useAuth } from '../providers/AuthProvider'
import { getDiceBearAvatar } from '@/lib/dicebear'
import { useTheme } from 'next-themes'
import { NavToggle } from './NavToggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/DropdownMenu"
import Logo from '../brand/Logo'
import { Input } from '../ui/Input'
import { Search } from 'lucide-react'

export default function DesktopNavBar() {
    const [mounted, setMounted] = useState(false);
    const { session } = useAuth();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const avatarUrl = useMemo(() => {
        return getDiceBearAvatar(session?.user?.id || "guest");
    }, [session?.user?.id]);

    const initials = session?.user?.name?.slice(0, 2).toUpperCase() || "??";

    return (
        <nav className='bg-sidebar flex flex-row justify-between border-b rounded-b-3xl py-3 px-4 lg:px-8'>
            <div className='flex flex-row gap-8 items-center justify-center'>
                <Logo hideText />
                <div className='flex flex-row items-center justify-center gap-4'>
                    <NavToggle
                        href="/feed"
                        label="Home"
                        icon={<HouseIcon className="size-4.5" />}
                    />

                    <NavToggle
                        href="/feed/search"
                        label="Search"
                        icon={<SearchIcon className="size-4.5" />}
                    />

                    <NavToggle
                        href="/feed/chat"
                        label="Chat"
                        icon={<MessageCirclePlus className="size-4.5" />}
                    />

                    <div className="relative w-full">
                        <Search className="absolute size-4 z-10 top-1/2 left-2.5 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            size={24}
                            className="pl-9" // Add additional styling as needed
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full" asChild>
                            <Avatar className='size-8 cursor-pointer hover:ring-2 ring-offset-2 hover:ring-secondary transition-all border border-border'>
                                {mounted && <AvatarImage src={avatarUrl} alt={session?.user?.name || "User"} />}
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-2xl w-56 -translate-x-4 translate-y-6">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem><BookmarkIcon /> Collections</DropdownMenuItem>
                            <DropdownMenuItem><Cog />Settings</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Theme</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className='text-destructive dark:text-red-400'><LogOutIcon className='text-destructive dark:text-red-400' /> Log Out</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}