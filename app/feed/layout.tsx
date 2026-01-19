import { ProtectedRoute } from "@/components/protected/ProtectedRoute";
import MobileNavBar from "@/components/feed/MobileNavBar";
import DesktopNavBar from "@/components/feed/DesktopNavBar";
import { InterestCheck } from "@/components/interest_check/InterestCheck";
import { Inter } from "next/font/google";

export default function FeedLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <InterestCheck>
                <div className="flex flex-col min-h-screen bg-background">

                    <main className="flex-1 pb-17 sm:pb-0 sm:pt-16">
                        {children}
                    </main>

                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background sm:hidden">
                        <MobileNavBar />
                    </div>

                    <div className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-background">
                        <DesktopNavBar />
                    </div>
                </div>
            </InterestCheck>
        </ProtectedRoute>
    );
}