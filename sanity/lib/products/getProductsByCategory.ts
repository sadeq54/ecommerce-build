import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export default async function getProductsByCategory(categorySlug: string) {
    const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product"
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)
    `);
    
    try {
        const products = await sanityFetch({
            query: PRODUCT_BY_CATEGORY_QUERY,
            params: {
                categorySlug // Ensure the parameter name matches the query
            }
        });
        return products.data || [];
    } catch (error) {
        console.log("Error fetching products", error);
        return [];
    }
}