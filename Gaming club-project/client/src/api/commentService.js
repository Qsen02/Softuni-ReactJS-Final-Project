import { del, post, put } from "./api";

let endpoint = "/comments";

export async function createComment(gameId, data) {
    return await post(`${endpoint}/games/${gameId}`, data);
}

export async function deleteComment(commentId) {
    return await del(`${endpoint}/${commentId}`);
}

export async function editComment(commentId, data) {
    await put(`${endpoint}/${commentId}`, data);
}