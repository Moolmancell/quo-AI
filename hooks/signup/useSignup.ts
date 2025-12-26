"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import { useState } from "react"


const formSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});

export function useSignUp() {
    const [isEmailTaken, setIsEmailTaken] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        }
    })

    const { errors } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { data, error } = await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.username,
            callbackURL: "/feed"
        }, {
            onRequest: () => {
                toast.loading("Creating your account...", { id: "signup" });
            },
            onSuccess: () => {
                toast.success("Successfully created your account!", { id: "signup" });
                router.push("/feed");
            },
            onError: (ctx) => {
                if (ctx.error?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
                    setIsEmailTaken(true);
                }
                toast.error(ctx.error.message, { id: "signup" });
            },
        });
    }

    return {
        form,
        errors,
        isEmailTaken,
        setIsEmailTaken,
        onSubmit
    }

}