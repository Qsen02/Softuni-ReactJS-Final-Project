import { del, get, post, put } from "./api";

const endpoint = "comments";

export async function getCommentById(commentId) {
    return await get(`${endpoint}/${commentId}`);
}

export async function createComment(movieId, data) {
    return await post(`${endpoint}/in/${movieId}`, data);
}

export async function deleteComment(commentId, movieId) {
    return await del(`${endpoint}/${commentId}/in/${movieId}`);
}

export async function editComment(commentId, movieId, data) {
    return await put(`${endpoint}/${commentId}/in/${movieId}`, data);
}

export async function likeComment(commentId) {
    await post(`${endpoint}/${commentId}/like`, {});
}

export async function unlikeComment(commentId) {
    await post(`${endpoint}/${commentId}/unlike`, {});
}