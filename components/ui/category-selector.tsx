"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Category } from "@/sanity.types"
import { useRouter } from "next/navigation"

interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelectorComponent({ categories }: CategorySelectorProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>("")
    const router = useRouter()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-full relative flex items-center justify-center sm:justify-start space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Filter By Category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 " />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search Category..."
                        className="h-9"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const selectedCAtegory = categories.find(
                                    (category) => category.title
                                        ?.toLowerCase()
                                        .includes(e.currentTarget.value.toLowerCase())
                                )
                                if (selectedCAtegory?.slug?.current) {
                                    setValue(selectedCAtegory._id)
                                    router.push(`/categories/${selectedCAtegory?.slug?.current}`)
                                    setOpen(false)
                                }
                            }
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No Category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(category._id === value ? "" : category._id)
                                        router.push(`/categories/${category?.slug?.current}`)
                                        setOpen(false)
                                    }}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
