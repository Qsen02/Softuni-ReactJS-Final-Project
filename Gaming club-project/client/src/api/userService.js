import { post, get } from "./api";

let endpoint = "/users";

export async function register(data) {
    let data = await post(`${endpoint}/register`, data);
    return data;
}

export async function login(data) {
    let data = await post(`${endpoint}/login`, data);
}

export async function logout() {
    await get(`${endpoint}/logout`);
}