import { del, get, post, put } from "./api";

let endpoint = "/games";

export async function getFirstGames() {
    let data = await get(`${endpoint}/0`);
    return data;
}

export async function getGameById(id) {
    let data = await get(`${endpoint}/${id}`);
    return data;
}

export async function createGame(data) {
    await post(`${endpoint}/`, data);
}

export async function deleteGame(id) {
    await del(`${endpoint}/${id}`);
}

export async function editGame(id, data) {
    return await put(`${endpoint}/${id}`, data);
}

export async function likeGame(id) {
    return await post(`${endpoint}/${id}/like`, {});
}

export async function unLikeGame(id) {
    return await post(`${endpoint}/${id}/unlike`, {});
}

export async function saveGame(id) {
    return await post(`${endpoint}/${id}/save`, {});
}

export async function unsaveGame(id) {
    return await post(`${endpoint}/${id}/unsave`, {});
}

export async function searching(value, criteria) {
    let data = await get(`${endpoint}/search/${value}/by/${criteria}`);
    return data;
}