'use client'

import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Form from "next/form"
import { PackageIcon, TrolleyIcon } from "@sanity/icons"
import { useEffect, useState } from "react"
import { useBasketStore } from "@/store"

export default function Header() {
    const { user } = useUser()
    const [isClient, setIsClient] = useState(false)
    const allItemsCount = useBasketStore((state)=> state.items.reduce((total , item)=> total + item.quantity , 0))  // get all the items in the basket


    useEffect(() => {
        setIsClient(true)
    }, [])

    const  createPassKey = async () => { 
        try {
            const response = await user?.createPasskey()
            console.log(response)
        } catch (error) {
            console.log("Error", JSON.stringify(error , null , 2))
        }
    }

    return (
        <header className="flex flex-wrap items-center justify-between px-4 py-2 ">
            {/* Top row */}
            <div className="flex items-center w-full justify-between flex-wrap">
                <Link
                    className="font-bold text-blue-500 text-2xl hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
                    href={"/"}
                >
                    shoper
                </Link>
                <Form
                    action={'/search'}
                    className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
                >
                    <input
                        className="bg-gray-100 text-gray-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
                        type="text"
                        name="query"
                        placeholder="Search for products..."
                    />
                </Form>
                <div className="flex items-center space-x-4 mt-4  sm:mt-2 flex-1 sm:flex-none">
                    <Link
                        className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold focus:ring-2"
                        href={'/basket'}
                    >
                        <TrolleyIcon className="w-6 h-6" />

                        <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white w-5 h-5 flex items-center justify-center text-xs" >
                            {allItemsCount}
                        </span>
                        <span>
                            My Basket
                        </span>
                    </Link>

                    {/* user area */}
                    {isClient && (
                        <ClerkLoaded>
                            <SignedIn>
                                <Link
                                    href={"/orders"}
                                    className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold focus:ring-2"
                                >
                                    <PackageIcon className="w-6 h-6" />
                                    <span >
                                        My Orders
                                    </span>
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <UserButton />
                                    <div className="hidden sm:block text-xs">
                                        <p className="text-gray-400">Welcome Back</p>
                                        <p className="font-bold">{user?.fullName}</p>
                                    </div>
                                </div>
                            </SignedIn>

                            <SignedOut>
                                <SignInButton mode="modal" />
                            </SignedOut>
                        </ClerkLoaded>
                    )}

                    {isClient && user?.passkeys.length === 0 && (
                        <button
                            onClick={createPassKey}
                            className="bg-white hover:bg-blue-700 hover:text-white text-blue-500 animate-pulse font-bold py-2 px-4 border-blue-500 rounded"
                        >
                            Create Passkey
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}
