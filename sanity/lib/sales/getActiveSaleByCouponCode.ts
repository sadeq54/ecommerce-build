import { defineQuery } from "next-sanity";
import { CouponCode } from "./CouponCode";
import { sanityFetch } from "../live";

export async function getActiveSaleByCouponCode(couponCode: CouponCode) {
    const ACTIVE_SALE_BY_COUPON_CODE_QUERY = defineQuery(`
    *[
    _type == "sales"
     && couponCode == $couponCode
     && isActive == true] | order(validFrom desc) [0]`);

     try {
        const sale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_CODE_QUERY,
            params: {
                couponCode: couponCode
            }
        });

        return sale.data
        
     } catch (error) {
        console.log("Error fetching products", error);
        return null;
     }
}