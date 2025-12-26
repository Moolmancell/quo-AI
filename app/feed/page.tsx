import { ProtectedRoute } from "@/components/protected/ProtectedRoute";

export default function FeedPage() {
    return <ProtectedRoute>
        <div>Feed Page</div>
    </ProtectedRoute>;
}