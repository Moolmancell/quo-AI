import SignUpForm from "@/components/signup/SignUpForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignUp() {
    return <main className="font-sans min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
            <Link href='/' className="flex flex-row gap-2 text-sm hover:underline items-center mb-4">
                <ArrowLeft className="w-4.5 h-auto" />
                Back
            </Link>
            <SignUpForm />
        </div>
    </main>
}