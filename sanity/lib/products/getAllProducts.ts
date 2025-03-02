import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllPrducts = async () => {
    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product"] | order(name asc)
    `);  // Using groq template literal instead of defineQuery

    try {
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY
        });
        return products.data || []; // u have problem here with any type
    } catch (error) {
        console.log("Error fetching products", error);
        return [];
    }
}

