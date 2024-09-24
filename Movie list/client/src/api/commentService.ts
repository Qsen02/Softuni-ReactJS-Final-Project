import { del, get, post, put } from "./api";

const endpoint = "comments";

type AnswerType = {
    _id:string,
    username: string,
    content: string,
    ownerId: string,
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

export async function getCommentById(commentId:string|undefined) {
    const comment=await get(`${endpoint}/${commentId}`)
    return comment as CommentType;
}

export async function createComment(movieId:string|undefined, data:{}) {
    return await post(`${endpoint}/in/${movieId}`, data);
}

export async function deleteComment(commentId:string|undefined, movieId:string|undefined) {
    return await del(`${endpoint}/${commentId}/in/${movieId}`);
}

export async function editComment(commentId:string|undefined, movieId:string|undefined, data:{}) {
    return await put(`${endpoint}/${commentId}/in/${movieId}`, data);
}

export async function likeComment(commentId:string|undefined,movieId:string | undefined) {
    return await post(`${endpoint}/${commentId}/in/${movieId}/like`, {});
}

export async function unlikeComment(commentId:string|undefined,movieId:string | undefined) {
    return await post(`${endpoint}/${commentId}/in/${movieId}/unlike`, {});
}