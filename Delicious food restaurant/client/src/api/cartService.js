import { del, get, post, put } from "./api";

const endpoint = "/cart";

export async function findUserCart() {
    return await get(`${endpoint}/find`);
}

export async function getCartById(cartId) {
    return await get(`${endpoint}/${cartId}`);
}

export async function addDishToCart(cartId, data) {
    await put(`${endpoint}/${cartId}`, data);
}

export async function removeDishFromCart(dishId, cartId) {
    return await del(`${endpoint}/remove/${dishId}/from/${cartId}`);
}

export async function orderDishes(cartId) {
    await post(`${endpoint}/order/${cartId}`);
}

export async function cancelOrder(cartId) {
    return await post(`${endpoint}/cancel/${cartId}`);
}

export async function getOrderById(orderId) {
    return await get(`${endpoint}/order/${orderId}`)
}