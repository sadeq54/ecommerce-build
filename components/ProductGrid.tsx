"use client"

import { Product } from '@/sanity.types'
import React from 'react'
import ProductThub from './ProductThub'
import { AnimatePresence, motion } from "framer-motion"
interface ProductGridProps {
    products: Product[];
  }
  
  const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
            {products.map((product) => (
                <AnimatePresence key={product._id}>
                    <motion.div
                        layout
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='flex justify-center'
                    >
                        <ProductThub product={product} />
                    </motion.div>
                </AnimatePresence>
            ))}
            
        </div>
    )
}
export default ProductGrid