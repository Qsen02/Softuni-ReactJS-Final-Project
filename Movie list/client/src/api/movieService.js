import { del, get, post, put } from "./api";

const endpoint = "movies";

export async function getAllMovies() {
    return await get(endpoint);
}

export async function getMovieById(movieId) {
    return await get(`${endpoint}/${movieId}`);
}

export async function createMovie(data) {
    await post(endpoint, data);
}

export async function deleteMovie(movieId) {
    await del(`${endpoint}/${movieId}`);
}

export async function editMovie(movieId, data) {
    await put(`${endpoint}/${movieId}`, data);
}

export async function likeMovie(movieId) {
    await post(`${endpoint}/${movieId}/like`, {});
}

export async function unlikeMovie(movieId) {
    await post(`${endpoint}/${movieId}/unlike`, {});
}

export async function saveMovie(movieId) {
    await post(`${endpoint}/${movieId}/save`, {});
}

export async function unsaveMovie(movieId) {
    await post(`${endpoint}/${movieId}/unsave`, {});
}