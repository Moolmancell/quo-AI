"use client"

import { useEffect, useState, useMemo } from 'react'
import { Button } from '../ui/Button'
import { Toggle } from '../ui/Toggle'
import { HouseIcon, SearchIcon, MessageCirclePlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useAuth } from '../providers/AuthProvider'
import { getDiceBearAvatar } from '@/lib/dicebear'
import Link from 'next/link'
import { NavToggle } from './NavToggle'

export default function MobileNavBar() {
    const [mounted, setMounted] = useState(false);
    const { session } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const avatarUrl = useMemo(() => {
        return getDiceBearAvatar(session?.user?.id || "guest");
    }, [session?.user?.id]);

    const initials = session?.user?.name?.slice(0, 2).toUpperCase() || "??";

    return (
        <nav className='bg-sidebar fixed bottom-0 left-0 right-0 flex flex-row justify-between border-t rounded-t-3xl py-3.5 px-8 sm:hidden z-50'>
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

            <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Avatar className='cursor-pointer hover:ring-2 ring-offset-2 hover:ring-secondary transition-all'>
                    {mounted && <AvatarImage src={avatarUrl} alt={session?.user?.name || "User"} />}
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </Button>
        </nav>
    );
}