import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function searchProductsByName(searchParams:string){
    const SEARCH_PRODUCTS_BY_NAME_QUERY = defineQuery(`
        *[_type == "product" && name match $searchParams] | order(name asc)
    `);
    try {
        const products = await sanityFetch({
            query: SEARCH_PRODUCTS_BY_NAME_QUERY,
            params: {
                searchParams: searchParams
            }
        });
        return products.data || []; // u have problem here with any type
    } catch (error) {
        console.log("Error fetching products", error);
        return [];
    }
}