'use client'
import { Button } from "../ui/Button"
import { Toggle } from "../ui/Toggle"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field } from "../ui/Field"
import { toast } from "sonner"
import { Skeleton } from "../ui/Skeleton"

const formSchema = z.object({
    interests: z.array(z.object({
        data: z.string(),
        index: z.number(),
    })).min(5, {
        error: "Please select at least 5 interests.",
    }),
})

//TODO: Implement interest check form
export function InterestForm() {

    const [fetchingOptions, setFetchingOptions] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)  
    const [options, setOptions] = useState<string[]>([
        "Programming", "Religion", "Technology", "Science", "Art", "Design", "Gaming"
    ])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            interests: [],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log("Submitted Interests:", values)
        } catch (error) {
            console.log()
        }
        // TODO: create API call to submit interests
    }

    function generateOptions() {
        //TODO: fetch options from API
        setOptions((prev) => [...prev, "Music", "Travel", "Sports", "Cooking", "Fitness", "Movies"] )
    }

    return (
        <main className="flex flex-col items-center gap-12 w-full h-screen pt-12 px-6">
            <div>
                <h2 className="font-semibold text-3xl text-center">Choose Interests</h2>
                <p className="pt-4 text-center">Choose 5 of your interests to see more of what matters to you.</p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between w-full h-full max-w-96">
                <Controller
                    name="interests"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <div className="flex flex-wrap flex-row gap-x-2 gap-y-2 w-full">
                                {options.map((option, index) => (
                                    <Toggle
                                        key={index}
                                        variant="outline"
                                        size="lg"
                                        pressed={field.value.some(obj => obj.index === index)}
                                        onPressedChange={(pressed) => {
                                            const current = field.value
                                            let next
                                            if (pressed) {
                                                next = [...current, {data: option, index: index}]
                                                generateOptions()
                                            } else {
                                                next = current.filter((value) => value.index !== index)
                                            }
                                            field.onChange(next)

                                            setSubmitButtonDisabled(next.length < 5)
                                        }}
                                    >
                                        {option}
                                    </Toggle>
                                ))}
                                {fetchingOptions && <Skeleton className="w-24 h-10"/>}
                                {fetchingOptions && <Skeleton className="w-32 h-10"/>}
                                {fetchingOptions && <Skeleton className="w-16 h-10"/>}
                                {fetchingOptions && <Skeleton className="w-12 h-10"/>}
                                {fetchingOptions && <Skeleton className="w-20 h-10"/>}
                                {fetchingOptions && <Skeleton className="w-18 h-10"/>}
                            </div>
                        </Field>
                    )}
                />
                <div className="flex flex-row w-full justify-end mt-3 py-12">
                    <Button
                        size='lg'
                        type="submit"
                        className={submitButtonDisabled ? "cursor-not-allowed opacity-50" : ""}
                        onClick={() => {
                            const values = form.getValues();
                            if (values.interests.length < 5) {
                                toast.info(`Please select ${5 - values.interests.length} more interest(s) to continue.`);
                            }
                        }}
                    >
                        Continue
                        <ChevronRight />
                    </Button>
                </div>
            </form>
        </main>
    )
}