import { post, get } from "./api";

let endpoint = "/users";

export async function register(data) {
    return await post(`${endpoint}/register`, data);

}

export async function login(data) {
    return await post(`${endpoint}/login`, data);
}

export async function logout() {
    await get(`${endpoint}/logout`);
}

export async function getUserById(id) {
    return await get(`${endpoint}/${id}`);
}

export async function getAuthorGames(userId) {
    return await get(`${endpoint}/${userId}/authorGames`);
}

export async function getSavedGames(userId) {
    return await get(`${endpoint}/${userId}/savedGames`);
}