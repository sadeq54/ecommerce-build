import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from "./sanity.types";


export interface BasketItem {
    product: Product;
    quantity: number
}// this will map to BasketState    

export interface BasketState {
    items: BasketItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => BasketItem[];
}

export const useBasketStore = create<BasketState>()(

    persist( // this make sure that the data inside the pasket is stored , uit work like the session 
        (set, get) => ({
            //initial state
            items: [],  
            addItem: (product) => set((state) => {
                const exsitingItem = state.items.find(
                    (item) => item.product._id === product._id);

                if (exsitingItem) {
                    return {
                        items: state.items.map((item) =>  // looping all the items
                            item.product._id === product._id
                                ? { ...item, quantity: item.quantity + 1 } // if exsits , increase the quantity (update the quantity)
                                : item  // return the same item
                        )
                    }
                } else {
                    return {
                        items: [...state.items, { product, quantity: 1 }],
                    }
                }
            }),
            removeItem: (productId) => set((state) => ({
                // here we are creating a new object containing the items without the one we want to remove if its quantity is 1 
                items: state.items.reduce((acc, item) => {
                    if (item.product._id === productId) {
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 });
                        }  //If quantity = 1: Remove item (by not pushing to acc)
                        
                    } else { // If no match: Keep item unchanged
                        acc.push(item); 
                    }
                    return acc;
                }, [] as BasketItem[])
            })),
            clearBasket: () => set({ items: [] }),
            getTotalPrice: () => get().items.reduce((acc, item) => acc + (item.product.price ?? 0) * item.quantity, 0),
            getItemCount: (productId) => get().items.reduce((acc, item) => {
                if (item.product._id === productId) {
                    acc += item.quantity;
                }
                return acc;
            }, 0),  // 0 is the initial value for the accumulator
            
            // here we are returning the items after any changes
            getGroupedItems: () => get().items, 
        }),
        {
            name: 'basket-store',
        },
    ),
)