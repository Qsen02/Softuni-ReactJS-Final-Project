import { createComment, deleteComment } from "../api/commentService";

export function useCreateComment() {
    async function creatingComment(movieId: string|undefined, data: {}) {
        return await createComment(movieId, data);
    }
    return creatingComment;
}

export function useDeleteComment() {
    async function deletingComment(commentId:string|undefined,movieId: string|undefined) {
        return await deleteComment(commentId, movieId);
    }
    return deletingComment;
}