export default function Background({ className }: { className?: string }) {
    return (
        <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
            <svg 
                className="h-full w-full object-cover" 
                viewBox="0 0 1139 845" 
                fill="none" 
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_4138_6533)">
                    {/* Top Blob */}
                    <g filter="url(#filter0_f_4138_6533)">
                        <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M981.467 247.589C740.807 254.286 588.455 177.584 408.141 129.906C209.116 77.2799 -77.8991 38.6895 -105.777 -39.8976C-134.857 -121.874 36.1455 -206.542 273.526 -249.57C483.144 -287.566 742.618 -254.112 981.467 -236.973C1146.81 -225.109 1304.07 -206.42 1413.27 -167.786C1513.28 -132.405 1531.13 -85.9884 1538.52 -39.8976C1546.44 9.50575 1539.44 57.8433 1456.32 100.74C1337.91 161.851 1218.32 240.999 981.467 247.589Z" 
                            // Light: Original Yellow | Dark: Your first OKLCH value
                            className="fill-[#FEE685] dark:fill-[oklch(0.7418_0.1142_67.7857)] transition-colors duration-500"
                        />
                    </g>
                    
                    {/* Bottom Blob */}
                    <g filter="url(#filter1_f_4138_6533)">
                        <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M-379.808 824.732C-381.332 707.157 -222.786 611.782 -23.5529 611.31C158.742 610.878 287.996 774.2 475.662 822.706C648.645 867.417 833.901 789.61 977.605 870.08C1128.35 954.491 1158.9 1087.87 1117.65 1182.2C1079.01 1270.56 908.314 1289.06 776.541 1329.88C634.305 1373.95 515.998 1470.28 331.722 1425.69C147.572 1381.12 102.059 1238.24 -16.7301 1137.91C-144.524 1029.98 -378.343 937.814 -379.808 824.732Z" 
                            // Light: Original Blue | Dark: Your second OKLCH value
                            className="fill-[#0084D1] dark:fill-[oklch(0.3020_0.0560_229.6950)] transition-colors duration-500"
                        />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_f_4138_6533" x="-359" y="-517" width="2150" height="1015" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_4138_6533" />
                    </filter>
                    <filter id="filter1_f_4138_6533" x="-629.819" y="361.309" width="2014.23" height="1325.89" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_4138_6533" />
                    </filter>
                    <clipPath id="clip0_4138_6533">
                        <rect width="1139" height="845" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}