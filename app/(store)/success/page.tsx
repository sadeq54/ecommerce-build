"use client"

import { Button } from "@/components/ui/button";
import { useBasketStore } from "@/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get("orderNumber");
    const clearBasket = useBasketStore((state) => state.clearBasket)

    // once u hit this page u the basket will be cleared
    useEffect(() => {
        if (orderNumber) {
            clearBasket();
        }
    }, [orderNumber, clearBasket])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
                <div className="flex justify-center mb-8">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                            <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
                        </svg>
                    </div>

                </div>
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Thank You for Your Order!
                </h1>
                <div className="border-t border-b border-gray-200 py-6 mb-6">
                    <p className="text-lg text-gray-700 mb-4">
                        Your order has been confirmed and will be shipped shortly.
                    </p>
                    <div className="space-y-2">
                        {orderNumber && (
                            <p className="text-gray-600 flex items-center space-x-5">
                                <span>Order Number:</span>
                                <span className="font-mono text-sm text-green-600">
                                    {orderNumber}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-gray-600">
                        A confirmation email has been sent to your registered email address.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-green-600 hover:bg-green-700 ">
                        <Link href={"/orders"}>
                        View Order Details
                        </Link>
                        </Button>
                        <Button asChild variant={"outline"}>
                            <Link href={"/"}>Continue shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
