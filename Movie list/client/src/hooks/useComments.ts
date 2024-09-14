import { createComment } from "../api/commentService";

export function useCreateComment() {
    async function creatingComment(movieId: string|undefined, data: {}) {
        return await createComment(movieId, data);
    }
    return creatingComment;
}