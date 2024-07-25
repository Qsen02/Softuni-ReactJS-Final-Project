import { createComment, editComment } from "../api/commentService";

export function useCreateComment() {
    async function creatingComment(gameId, commentData) {
        const game = await createComment(gameId, commentData);
        return game;
    }

    return creatingComment
}

export function useEditComment() {
    async function editingComment(commentId, commentData) {
        const game = await editComment(commentId, commentData);
        return game;
    }

    return editingComment
}