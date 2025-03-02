import { COUPON_CODES } from '@/sanity/lib/sales/CouponCode'
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'
import React from 'react'

export default async function EidAlFitrBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.EALFATER)
  if (!sale?.isActive) return null
  return (
    <div className='bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg '>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex-1'>
          <h2 className='text-3xl sm:text-5xl font-extrabold text-left mb-4'>
            {sale.title}
          </h2>
          <p className='text-xl sm:text-3xl font-semibold text-left mb-6'>
            {sale.description}
          </p>
          <div className="flex">
            <div className='bg-white text-black px-6 py-4 rounded-full shadow-md transform hover:scale-105 transition duration-300'>
              <span className='font-bold text-base sm:text-xl'>
                Use code: {" "}
                <span className='text-red-600'>{sale.couponCode}</span>
              </span>
              <span className='ml font-bold text-base sm:text-xl'>
                {" "}for {sale.descountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
