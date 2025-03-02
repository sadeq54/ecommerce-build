export const COUPON_CODES =  {
    EALFATER : "EALFATER",
    NY2025 : "NY2025",
} as const

export type CouponCode = keyof typeof COUPON_CODES;