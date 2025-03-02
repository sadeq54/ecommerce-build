import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            type: "number",
            title: "Order Number",
            validation: Rule => Rule.required(),

        }),
        defineField({
            name: "stripeCheckoutSessionId",
            type: "string",
            title: "Stripe Checkout Session ID",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "StripeCustomerId",
            type: "string",
            title: "Stripe Customer ID",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "clerckUserId",
            title: "Store User ID",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "customerName",
            type: "string",
            title: "Customer Name",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: "email",
            type: "string",
            title: "Customer Email",
            validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: "stripePaymentIntentId",
            type: "string",
            title: "Stripe Payment Intent ID",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "products",
            type: "array",
            title: "Products",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            type: "reference",
                            title: "Product Bought",
                            to: { type: "product" },
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity Parchased",
                            type: "number",
                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            quantity: "quantity",
                            image: "product.image",
                            price: "product.price",
                            currency: "product.currency",
                        },
                        prepare(select) {
                            return {
                                title: `${select.product} x ${select.quantity}`,
                                subtitle: `$${select.price * select.quantity} `,
                                media: select.image,
                            }
                        }
                    },
                })
            ],
        }),
        defineField({
            name: "totalPrice",
            type: "number",
            title: "Total Price",
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: "currency",
            type: "string",
            title: "Currency",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "amountDiscount",
            type: "number",
            title: "Amount Discount",
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: "status",
            type: "string",
            title: "Status",
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Paid', value: 'paid' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
                // layout: 'radio'
            }
        }),
        defineField({
            name: "orderDate",
            type: "datetime",
            title: "Order Date",
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "totalPrice",
            currency: "currency",
            orderId: "orderNumber",
            email: "email",
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`
            return {
                title: `${select.name} (${orderIdSnippet})`,
                subtitle: `${select.amount} ${select.currency}, ${select.email}`,
                media: BasketIcon,
            }
        }
    },

})