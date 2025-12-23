"use client"

import { useEffect, useState } from 'react' // 1. Import hooks
import Logo from '../brand/Logo'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { MoonIcon, SunIcon } from 'lucide-react' // 2. Add Sun icon
import { useTheme } from 'next-themes'

export default function NavBar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <nav className='bg-sidebar flex flex-row justify-between border-b rounded-b-3xl py-3 px-4 sm:px-8'>
                <Link href="/"><Logo /></Link>
                <div className='flex flex-row gap-4'>
                    <Button variant="ghost" size="icon" disabled><MoonIcon className="h-5 w-5" /></Button>
                    <div className='flex flex-row gap-2'>
                        <Button asChild size="sm">
                            <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild variant="secondary" size="sm">
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className='bg-sidebar flex flex-row justify-between border-b rounded-b-3xl py-3 px-4 sm:px-8'>
            <Link href="/"><Logo /></Link>

            <div className='flex flex-row gap-4'>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'dark' ? (
                        <SunIcon className="h-5 w-5 transition-all" />
                    ) : (
                        <MoonIcon className="h-5 w-5 transition-all" />
                    )}
                </Button>

                <div className='flex flex-row gap-2'>
                    <Button size="sm">Log In</Button>
                    <Button variant="secondary" size="sm">Sign Up</Button>
                </div>
            </div>
        </nav>
    );
}