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
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export default function LogInForm() {

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
        
        const apiURL = process.env.NODE_ENV === "development"
            ? "https://api.example.com/login-success" //change this accordingly to the one you want to test
            : process.env.NEXT_PUBLIC_API_URL + "/login";

        console.log(values);
        const loadingToast = toast.loading("Logging in...");
        try {
            const response = await axios.post(apiURL, values);

            if (response.status === 201 || response.status === 200) {
                toast.success("Logged in successfully!", { id: loadingToast });
                // Optional: redirect user using useRouter()
                router.push("/feed");
            }
        } catch (error: any) {
            console.error("Form submission error", error);

            // Handle specific error messages from your backend
            const errorMessage = error.response?.data?.message || "Failed to login.";
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
                            <CardTitle className="text-base text-center font-bold">Login to your account</CardTitle>
                            <CardDescription className="text-small text-center font-normal text-muted-foreground">
                                Enter your email and password below to login to your account
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <FieldSet disabled={form.formState.isSubmitting}>
                            <FieldGroup className="flex flex-col gap-5">
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input id="email" placeholder="john.doe@example.com" aria-invalid={errors.email ? "true" : "false"} {...form.register("email")} />
                                    <FieldError>{form.formState.errors.email?.message}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <InputPassword
                                        id="password"
                                        placeholder="********"
                                        aria-invalid={errors.password ? "true" : "false"}
                                        {...form.register("password")}
                                    />
                                    <FieldError>{form.formState.errors.password?.message}</FieldError>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 w-full">
                            <Button type="submit" variant="default" className="w-full" size="lg" disabled={form.formState.isSubmitting}>Log In</Button>
                            <Button type="button" variant="secondary" className="w-full" size="lg" disabled={form.formState.isSubmitting}>Log In With Google</Button>
                        </div>
                        <p className="text-sm">
                            Don't have an account? <Link href="/signup" className="underline hover:text-primary">Sign Up</Link>
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}