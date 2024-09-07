import { get ,post,del,put} from "./api";

const endpoint = "movies";

export async function getAllMovies() {
    return  await get(endpoint);
}

export async function getMovieById(movieId:string) {
    return await get(`${endpoint}/${movieId}`);
}

export async function getTopMovies() {
    return await get(`${endpoint}/top/movies`);
}

export async function createMovie(data:{}) {
    await post(endpoint, data);
}

export async function deleteMovie(movieId:string) {
    await del(`${endpoint}/${movieId}`);
}

export async function editMovie(movieId:string, data:{}) {
    await put(`${endpoint}/${movieId}`, data);
}

export async function likeMovie(movieId:string) {
    await post(`${endpoint}/${movieId}/like`, {});
}

export async function unlikeMovie(movieId:string) {
    await post(`${endpoint}/${movieId}/unlike`, {});
}

export async function saveMovie(movieId:string) {
    await post(`${endpoint}/${movieId}/save`, {});
}

export async function unsaveMovie(movieId:string) {
    await post(`${endpoint}/${movieId}/unsave`, {});
}