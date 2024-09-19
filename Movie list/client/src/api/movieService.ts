import { get, post, del, put } from "./api";

const endpoint = "movies";

export async function getAllMovies() {
    const movies = await get(`${endpoint}/page/0`)
    return movies as { movies: [], maxPage: number };
}

export async function pagination(page: number) {
    const movies = await get(`${endpoint}/page/${page}`)
    return movies as { movies: [], maxPage: number };
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
    return movies as {results:[],maxPage:number};
}

export async function createMovie(data: {}) {
    await post(endpoint, data);
}

export async function deleteMovie(movieId: string | undefined) {
    await del(`${endpoint}/${movieId}`);
}

export async function editMovie(movieId: string | undefined, data: {}) {
    return await put(`${endpoint}/${movieId}`, data);
}

export async function likeMovie(movie: {}) {
    return await post(`${endpoint}/${(movie as { _id: string })._id}/like`, movie);
}

export async function unlikeMovie(movie: {}) {
    return await post(`${endpoint}/${(movie as { _id: string })._id}/unlike`, movie);
}

export async function saveMovie(movie: {}) {
    return await post(`${endpoint}/${(movie as { _id: string })._id}/save`, movie);
}

export async function unsaveMovie(movie: {}) {
    return await post(`${endpoint}/${(movie as { _id: string })._id}/unsave`, movie);
}