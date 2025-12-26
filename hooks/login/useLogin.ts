"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export function useLogin() {
        const router = useRouter();
    
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password: "",
            }
        })
    
        const { errors } = form.formState;
    
        async function onSubmit(values: z.infer<typeof formSchema>) {
            const { data, error } = await authClient.signIn.email({
                email: values.email,
                password: values.password,
            }, {
                onRequest: () => {
                    toast.loading("Logging in...", { id: "login" });
                },
                onSuccess: () => {
                    toast.success("Logged in successfully!", { id: "login" });
                    router.push("/feed");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message, { id: "login" });
                },
            });
        }
    return {
        form,
        errors,
        onSubmit,   
    }
}