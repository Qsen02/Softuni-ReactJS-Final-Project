import { addDishToCart, findUserCart } from "../api/cartService";

export function useGetUserCart() {
    async function gettingCart() {
        return await findUserCart();
    }

    return gettingCart;
}

export function useAddToCart() {
    async function addingToCart(cartId, data) {
        return await addDishToCart(cartId, data);
    }

    return addingToCart;
}