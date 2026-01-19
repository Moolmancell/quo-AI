import { ProtectedRoute } from "@/components/protected/ProtectedRoute";

export default function InterestCheckLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}