export default function Logo({hideText}: {hideText?: boolean}) {
    return (
        <div className="flex flex-row gap-2 items-center">
            {/* 1. Set stroke to currentColor. 2. Use text classes for color */}
            <svg 
                className="text-gray-900 dark:text-slate-100" 
                width="32" height="32" viewBox="0 0 32 32" 
                fill="none" xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor" 
            >
                <path d="M22.9333 3.20001H9.06662C5.82655 3.20001 3.19995 5.82661 3.19995 9.06668V22.9333C3.19995 26.1734 5.82655 28.8 9.06662 28.8H22.9333C26.1734 28.8 28.8 26.1734 28.8 22.9333V9.06668C28.8 5.82661 26.1734 3.20001 22.9333 3.20001Z" strokeWidth="2.5" />
                <path d="M10.3999 9.86664V22.1333" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M21.8667 9.86664V22.1333" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M16 8V24" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {!hideText && <span className={`hidden md:block text-base dark:text-white`}>Quo <strong>AI</strong></span>}
        </div>
    );
}