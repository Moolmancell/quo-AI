'use client'
import { Button } from "../ui/Button"
import { Toggle } from "../ui/Toggle"
import { ChevronRight } from "lucide-react"

//TODO: Implement interest check form
export function InterestForm() {
    return (
        <main className="flex flex-col  items-center gap-12 w-full h-screen py-12 px-4">
            <div>
                <h2 className="font-semibold text-3xl text-center">Choose Interests</h2>
                <p className="pt-4 text-center">Choose your interests to see more of what matters to you.</p>
            </div>
            <div className="flex flex-col justify-between w-full h-full max-w-96">
                <div className="flex flex-wrap flex-row gap-x-2 gap-y-2 w-full">
                    <Toggle size='lg' variant='outline'>Programming</Toggle>
                    <Toggle size='lg' variant='outline'>Religion</Toggle>
                    <Toggle size='lg' variant='outline'>Technology</Toggle>
                    <Toggle size='lg' variant='outline'>Technology</Toggle>
                    <Toggle size='lg' variant='outline'>Technology</Toggle>
                    <Toggle size='lg' variant='outline'>Technology</Toggle>
                    <Toggle size='lg' variant='outline'>Technology</Toggle>
                    <Toggle size='lg' variant='outline'>Science</Toggle>
                    <Toggle size='lg' variant='outline'>Art</Toggle>
                </div>
                <div className="flex flex-row w-full justify-end mt-3">
                    <Button size='lg'>
                        Continue
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </main>
    )
}