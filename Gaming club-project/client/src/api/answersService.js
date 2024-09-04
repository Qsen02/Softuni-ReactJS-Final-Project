import { del, get, post, put } from "./api";

const endpoint = "/answers";

export async function getAllAnswers(commentId) {
    return await get(`${endpoint}/comment/${commentId}`);
}

export async function getAnswerById(answerId) {
    return await get(`${endpoint}/${answerId}`);
}

export async function createAnswer(commentId, data) {
    return await post(`${endpoint}/comment/${commentId}`, data);
}

export async function editAnswer(answerId, data) {
    return await put(`${endpoint}/${answerId}`, data);
}

export async function deleteAnswer(answerId, commentId) {
    return await del(`${endpoint}/${answerId}/from/${commentId}`);
}