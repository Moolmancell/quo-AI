"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Link from "next/link"

import { Form } from "@/components/ui/Form"
import { Field, FieldLabel, FieldDescription, FieldError, FieldSet, FieldGroup } from "@/components/ui/Field"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Logo from "@/components/brand/Logo"
import InputPassword from "@/components/forms/InputPassword"
import axios from "axios";
import { useRouter } from "next/navigation"

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

export default function SignUpForm() {

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

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const apiURL = process.env.NODE_ENV === "development"
            ? "https://api.example.com/signup-success" //change this accordingly to the one you want to test
            : process.env.NEXT_PUBLIC_API_URL + "/signup";

        console.log(values);
        const loadingToast = toast.loading("Creating your account...");
        try {
            const response = await axios.post(apiURL, values);

            if (response.status === 201 || response.status === 200) {
                toast.success("Account created successfully!", { id: loadingToast });
                // Optional: redirect user using useRouter()
                router.push("/login");
            }
        } catch (error: any) {
            console.error("Form submission error", error);

            // Handle specific error messages from your backend
            const errorMessage = error.response?.data?.message || "Failed to create account.";
            toast.error(errorMessage, { id: loadingToast });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader className="flex flex-col items-center gap-4">
                        <Logo />
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-base text-center font-bold">Create an Account</CardTitle>
                            <CardDescription className="text-small text-center font-normal text-muted-foreground">
                                Enter your information below to create your account
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <FieldSet disabled={form.formState.isSubmitting}>
                            <FieldGroup className="flex flex-col gap-5">
                                <Field>
                                    <FieldLabel htmlFor="username">Username</FieldLabel>
                                    <Input id="username" placeholder="JohnDoe123" {...form.register("username")} />
                                    <FieldError>{form.formState.errors.username?.message}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input id="email" placeholder="john.doe@example.com" {...form.register("email")} />
                                    <FieldError>{form.formState.errors.email?.message}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <InputPassword
                                        id="password"
                                        placeholder="********"
                                        {...form.register("password")}
                                    />
                                    <FieldDescription>Min. 8 chars, including uppercase, lowercase, number, and special character.</FieldDescription>
                                    <FieldError>{form.formState.errors.password?.message}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="confirm_password">Confirm Password</FieldLabel>
                                    <InputPassword
                                        id="confirm_password"
                                        placeholder="********"
                                        {...form.register("confirm_password")}
                                    />
                                    <FieldError>{form.formState.errors.confirm_password?.message}</FieldError>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 w-full">
                            <Button type="submit" variant="default" className="w-full" size="lg" disabled={form.formState.isSubmitting}>Sign Up</Button>
                            <Button type="button" variant="secondary" className="w-full" size="lg" disabled={form.formState.isSubmitting}>Sign Up With Google</Button>
                        </div>
                        <p className="text-sm">
                            Already have an account? <Link href="/login" className="underline hover:text-primary">Log In</Link>
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}