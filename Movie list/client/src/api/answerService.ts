import { del, get, post, put } from "./api";

const endpoint = "answers";

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
}

type AnswerType = {
    _id: string,
    username: string,
    content: string,
    ownerId: User,
    likes: {}[]
}

type CommentType = {
    username: string,
    content: string,
    ownerId: string,
    movieId: string,
    likes: {}[],
    answers: AnswerType[]
}

export async function getAnswerById(answerId: string | undefined) {
    const answer = await get(`${endpoint}/${answerId}`);
    return answer as AnswerType;
}

export async function createAnswer(data: {}, commentId: string | undefined) {
    const comment = await post(`${endpoint}/in/comment/${commentId}`, data);
    return comment as CommentType;
}

export async function deleteAnswer(answerId: string | undefined, commentId: string | undefined) {
    await del(`${endpoint}/${answerId}/in/${commentId}`);
}

export async function editAnswer(answerId: string | undefined, commentId: string | undefined, data: {}) {
    const comment = await put(`${endpoint}/${answerId}/in/${commentId}`, data);
    return comment as CommentType;
}

export async function likeAnswer(answerId: string , commentId: string | undefined) {
    const answer = await post(`${endpoint}/${answerId}/in/${commentId}/like`, {});
    return answer as AnswerType;
}

export async function unlikeAnswer(answerId: string, commentId: string | undefined) {
    const answer = await post(`${endpoint}/${answerId}/in/${commentId}/unlike`, {});
    return answer as AnswerType;
}
