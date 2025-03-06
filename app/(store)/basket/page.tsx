"use client"

import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession"
import AddToBasket from "@/components/AddToBasket"
import Loader from "@/components/Loader"
import { imageUrl } from "@/lib/imageUrl"
import { useBasketStore } from "@/store"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BasketPage() {
    const allItems = useBasketStore((state) => state.getGroupedItems())
    const { user } = useUser()
    const { isSignedIn } = useAuth()
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    async function handeleCheckOut() {
        if (!isSignedIn) return;
        setIsLoading(true)
        try {

            const metadata: Metadata = {
                orderNumer: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                custiomerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            }; 

            const checkoutUrl = await createCheckoutSession(allItems , metadata)
            if (checkoutUrl){
                window.location.href = checkoutUrl
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <Loader />
    }

    if (allItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
                <p className="text-gray-600 text-lg">Your Basket is empty</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 min-w-6xl">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Basket Items Section */}
                <div className="w-1/2 lg:w-3/5">
                    {allItems?.map((item) => (
                        <div
                            key={item.product._id}
                            className="mb-6 p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                {/* Product Image and Details */}
                                <div
                                    className="flex items-center cursor-pointer flex-1 min-w-0"
                                    onClick={() => {
                                        router.push(`product/${item.product.slug?.current}`)
                                    }}
                                >
                                    {/* Image Container */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4 sm:mr-6 lg:mr-8">
                                        {item.product.image && (
                                            <Image
                                                src={imageUrl(item.product.image).url()}
                                                alt={item.product.name ?? "Product Image"}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        )}
                                    </div>
                                    {/* Text Container */}
                                    <div className="min-w-0">
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate mx-4">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600 mx-4">
                                            Price: ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Add to Basket Button */}
                                <div className="flex items-center ml-4 flex-shrink-0">
                                    <AddToBasket product={item.product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Section */}
                <div className="w-1/2 lg:w-1/4 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Order Summary
                    </h3>
                    {/* Add order summary details here */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Items:</span>
                            <span>
                                {allItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold border-t pt-2">
                            <span>Total</span>
                            <span className="text-gray-800 font-semibold">
                                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {isSignedIn ? (
                        <button
                            onClick={handeleCheckOut}
                            disabled={isLoading}
                            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {isLoading ? "Processing..." : "checkout"}
                        </button>) : (
                        <SignInButton mode="modal">
                            <button
                                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600"
                            >
                                Sign In to checkout
                            </button>
                        </SignInButton>
                    )
                    }

                </div>
                <div className="h-68 lg:h-0">

                </div>
            </div>
        </div>
    )
}