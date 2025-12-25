import LogInForm from "@/components/login/LogInForm"

export default function LogIn() {
    return <main className="font-sans min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
            <LogInForm />
        </div>
    </main>
}