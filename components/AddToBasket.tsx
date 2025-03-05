'use client'

import { useBasketStore } from '@/store'
import { Product } from '@/sanity.types'
import { useEffect, useState } from 'react'

interface addToBasketButtonProps {
    product: Product
    disabled?: boolean
}
export default function AddToBasket({ product, disabled }: addToBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product._id)

     
    // 1. Server Phase: This state is initialized but not interactive
    const [isClient, setIsClient] = useState(false)

    // 2. Hydration Phase: useEffect runs after hydration
    useEffect(() => {
        setIsClient(true)  // Now we know we're client-side
    }, [])

    // 3. Pre-Hydration: Return null to prevent mismatches
    if (!isClient) return null

    // 4. Post-Hydration: Fully interactive component
    return (
        <div 
        className='flex items-center justify-center space-x-2'
        >
            <button
            onClick={()=> removeItem(product._id)}
            disabled={itemCount === 0 || disabled}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
                itemCount === 0 ? "bg-gray-100 cursor-not-allowed":
                "bg-gray-200 hover:bg-gray-300"
            }`}
            >
            <span className={`text-xl font-bold  ${
                itemCount === 0 ? "text-gray-400":
                "text-gray-600"
            }`}>
                -
            </span>

            </button>
            <span className='w-8 text-center font-semibold'>{itemCount}</span>

            <button
            onClick={()=> addItem(product)}
            disabled={disabled}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
                disabled  ? "bg-gray-100 cursor-not-allowed":
                "bg-blue-500 hover:bg-blue-600"
            }`}
            >
            <span className={`text-xl font-bold text-white`}>
                +
            </span>
            </button>
        </div>
    )
}
