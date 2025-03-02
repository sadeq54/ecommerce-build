import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({ 
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
            title: "Product name",
            validation: Rule => Rule.required(),

        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Product image",
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "description",
            type: "blockContent",
            title: "Description",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "price",
            type: "number",
            title: "Price",
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: "stock",
            type: "number",
            title: "Stock",
            validation: Rule => Rule.min(0),

        })
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            price: 'price',
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.price}`,
                media: select.media

            }
        }
    }
})