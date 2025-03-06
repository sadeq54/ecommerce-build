"use server"

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store";


export type Metadata = {
    orderNumer: string;
    customerName: string
    custiomerEmail: string;
    clerkUserId: string;
}

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
}

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
    try {

        // check if all items have a price
        const itemsWithoutPrice = items.filter(item => !item.product.price)
        // if so, throw an error
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some of the items don't have a price")
        }
        // search for existing   customer by email 
        const customers = await stripe.customers.list({
            email: metadata.custiomerEmail,
            limit: 1, // return the first match 
        })

        let customerId: string | undefined;

        if (customers.data.length > 0) {
            customerId = customers.data[0].id
        }

        // this session for the customer from stripe , to show the checkout page 
        // if the customer is not found , then create a new customer
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : 'always',
            customer_email: !customerId ? metadata.custiomerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumer}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/basket`,
            line_items: items.map(item => ({
                price_data: {
                    currency: "gbp",
                    unit_amount: Math.round(item.product.price! * 100),  // 1 JD = 100 cents convert to the smallest unit
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        description: `Product ID: ${item.product._id}`,
                        metadata: {
                            id: item.product._id
                        },
                        images: item.product.image ?
                            [imageUrl(item.product.image).url()] : undefined

                    }
                },
                quantity: item.quantity,
            })),
        })
        return checkoutSession.url;
    } catch (error) {
        console.error(error)
        throw error
    }
}