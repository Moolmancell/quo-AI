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

export default function MobileNavBar() {
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
        <nav className='bg-sidebar flex flex-row justify-between border-t rounded-t-3xl py-3.5 px-8 sm:hidden z-50'>
            <NavToggle
                href="/feed"
                label="Home"
                icon={<HouseIcon />}
            />

            <NavToggle
                href="/feed/search"
                label="Search"
                icon={<SearchIcon />}
            />

            <NavToggle
                href="/feed/chat"
                label="Chat"
                icon={<MessageCirclePlus />}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full" asChild>
                        <Avatar className='cursor-pointer hover:ring-2 ring-offset-2 hover:ring-secondary transition-all border border-border'>
                            {mounted && <AvatarImage src={avatarUrl} alt={session?.user?.name || "User"} />}
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl w-56 -translate-x-4 -translate-y-5">
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
                        <DropdownMenuItem className='text-destructive dark:text-red-400'><LogOutIcon className='text-destructive dark:text-red-400'/> Log Out</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}