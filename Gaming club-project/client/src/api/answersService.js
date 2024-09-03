import { del, get, post, put } from "./api";

const endpoint = "/answers";

async function getAllAnswers(commentId) {
    return await get(`${endpoint}/${commentId}`);
}

async function createAnswer(commentId, data) {
    await post(`${endpoint}/${commentId}`, data);
}

async function editAnswer(answerId, data) {
    return await put(`${endpoint}/${answerId}`, data);
}

async function deleteAnswer(answerId, commentId) {
    return await del(`${endpoint}/${answerId}/from/${commentId}`);
}