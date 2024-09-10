import { get, post, del, put } from "./api";

const endpoint = "movies";

export async function getAllMovies() {
    const movies = await get(endpoint)
    return movies as [];
}

export async function getMovieById(movieId: string | undefined) {
    const movie = await get(`${endpoint}/${movieId}`);
    return movie as {};
}

export async function getTopMovies() {
    const movies = await get(`${endpoint}/top/movies`);
    return movies as [];
}

export async function searchMovies(query: string) {
    const movies = await get(`${endpoint}/search/${query}`);
    return movies as [];
}

export async function createMovie(data: {}) {
    await post(endpoint, data);
}

export async function deleteMovie(movieId: string) {
    await del(`${endpoint}/${movieId}`);
}

export async function editMovie(movieId: string, data: {}) {
    await put(`${endpoint}/${movieId}`, data);
}

export async function likeMovie(movieId: string) {
    await post(`${endpoint}/${movieId}/like`, {});
}

export async function unlikeMovie(movieId: string) {
    await post(`${endpoint}/${movieId}/unlike`, {});
}

export async function saveMovie(movieId: string) {
    await post(`${endpoint}/${movieId}/save`, {});
}

export async function unsaveMovie(movieId: string) {
    await post(`${endpoint}/${movieId}/unsave`, {});
}