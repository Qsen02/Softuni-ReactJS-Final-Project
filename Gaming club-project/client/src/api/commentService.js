import { del, post, put } from "./api";

let endpoint = "/comments";

export async function createComment(gameId, data) {
    await post(`${endpoint}/games/${gameId}`, data);
}

export async function deleteComment(commentId, gameId) {
    await del(`${endpoint}/${commentId}/games/${gameId}`);
}

export async function editComment(commentId, data) {
    await put(`${endpoint}/${commentId}`, data);
}