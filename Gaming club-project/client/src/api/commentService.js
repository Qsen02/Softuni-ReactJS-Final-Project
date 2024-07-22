import { del, get, post, put } from "./api";

let endpoint = "/comments";

export async function createComment(gameId, data) {
    return await post(`${endpoint}/games/${gameId}`, data);
}

export async function deleteComment(commentId) {
    return await del(`${endpoint}/${commentId}`);
}

export async function editComment(commentId, gameId, data) {
    return await put(`${endpoint}/${commentId}/games/${gameId}`, data);
}

export async function getCommentById(commentId, ) {
    return await get(`${endpoint}/${commentId}`);
}