import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export async function getMyOrders(userId: string) {
    const MY_ORDERS_QUERY = defineQuery(`
          *[_type == "order" && clerckUserId == $userId]  | order(orderDate desc)
          {
            ...,    // Spread all order fields
            products[]{  // Array of products
                ...,  // Spread product fields
                product->  // Reference expansion
            }
          }
      `);
      
    /* 
    example of the stucture of the data
    {
"_type": "order",
"clerckUserId": "user_123",
"orderDate": "2024-03-06",
"products": [
  {
    "quantity": 2,
    "product": {
      "_id": "prod_123",
      "name": "T-Shirt",
      "price": 29.99
    }
  }
]
}

    */

    try {
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: { userId }
        });

        if (!orders) {
            console.log("No orders found");
            return [];
        }

        return orders.data || [];
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}