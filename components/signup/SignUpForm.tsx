"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Link from "next/link"
import { authClient } from "@/lib/auth-client";
import { Form } from "@/components/ui/Form"
import { Field, FieldLabel, FieldDescription, FieldError, FieldSet, FieldGroup } from "@/components/ui/Field"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Logo from "@/components/brand/Logo"
import InputPassword from "@/components/forms/InputPassword"
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

export default function SignUpForm() {

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
                if (ctx.error.code.includes("USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL")) {
                    setIsEmailTaken(true);
                }
                toast.error(ctx.error.message, { id: "signup" });
            },
        });
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
                                    <Input id="username" placeholder="JohnDoe123" aria-invalid={errors.username ? "true" : "false"} {...form.register("username")} />
                                    <FieldError>{form.formState.errors.username?.message}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input id="email" placeholder="john.doe@example.com" aria-invalid={errors.email || isEmailTaken ? "true" : "false"} onInput={() => setIsEmailTaken(false)} {...form.register("email")} />
                                    <FieldError>{form.formState.errors.email?.message}{isEmailTaken ? " Email is already taken." : ""}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <InputPassword
                                        id="password"
                                        placeholder="********"
                                        aria-invalid={errors.password ? "true" : "false"}
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
                                        aria-invalid={errors.confirm_password ? "true" : "false"}
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