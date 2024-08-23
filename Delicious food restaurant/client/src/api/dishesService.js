import {get, post, del, put } from "./api";

const endpoint = "/dishes";

export async function getFirstDishes() {
    return await get(`${endpoint}/page/0`);
}

export async function getDishById(dishId) {
    return await get(`${endpoint}/${dishId}`);
}

export async function getDishesByPage(page) {
    return await get(`${endpoint}/page/${page}`);
}

export async function searchDishes(query) {
    return await get(`${endpoint}/search/${query}`);
}

export async function createDish(data) {
    await post(`${endpoint}`, data);
}

export async function deleteDish(dishId) {
    await del(`${endpoint}/${dishId}`);
}

export async function editDish(dishId, data) {
    return await put(`${endpoint}/${dishId}`, data);
}

export async function likeDish(dishId) {
    return await post(`${endpoint}/${dishId}/like`);
}

export async function unlikeDish(dishId) {
    return await post(`${endpoint}/${dishId}/unlike`);
}