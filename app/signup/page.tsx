import SignUpForm from "@/components/signup/SignUpForm"

export default function SignUp() {
    return <main className="font-sans min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
            <SignUpForm />
        </div>
    </main>
}