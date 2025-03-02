import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: "sales",
    title: "Sales",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sale Title",
            type: "string",
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Sale Description",
        }),
        defineField({
            name: "descountAmount",
            type: "number",
            title: "Descount Amount",
            description: "Amount off in percentage or fixed value",
        }),
        defineField({
            name: "couponCode",
            type: "string",
            title: "Coupon Code",
        }),
        defineField({
            name: "validFrom",
            type: "datetime",
            title: "Valid From",
        }),
        defineField({
            name: "validUntil",
            type: "datetime",
            title: "Valid Until",
        }),
        defineField({
            name: "isActive",
            type: "boolean",
            title: "Is Active",
            description: "Toggle to activate/deactivate the sale",
            initialValue: true,
        }),

    ],
    preview: {
        select: {
            title: "title",
            discountAmount: "descountAmount",
            couponCode: "couponCode",
            isActive: "isActive",
        },
        prepare(selection) {
            const { title, discountAmount, couponCode, isActive } = selection;
            const status = isActive ? "Active" : "Inactive";
            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
            };
        }
    },
});