import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";



export async function getProductBySlug(slug: string) {
    const PRODUCT_BY_SLUG_QUERY = defineQuery(`
        *[_type == "product" && slug.current == $slug][0]
    `);
    try {
        const product = await sanityFetch({
            query: PRODUCT_BY_SLUG_QUERY,
            params: {
                slug: slug
            }
        });
        return product.data || null;
    } catch (error) {
        console.log("Error fetching product", error);
        return null;
    }
}
