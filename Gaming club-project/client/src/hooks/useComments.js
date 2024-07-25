import { createComment } from "../api/commentService";

export function useCreateComment() {
    async function creatingComment(gameId, commentData) {
        const game = await createComment(gameId, commentData);
        return game;
    }

    return creatingComment
}