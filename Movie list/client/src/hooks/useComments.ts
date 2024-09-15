import { useEffect, useState } from "react";
import { createComment, deleteComment, getCommentById, likeComment, unlikeComment } from "../api/commentService";
import { useNavigate } from "react-router-dom";

export function useCreateComment() {
    async function creatingComment(movieId: string | undefined, data: {}) {
        return await createComment(movieId, data);
    }
    return creatingComment;
}

export function useDeleteComment() {
    async function deletingComment(commentId: string | undefined, movieId: string | undefined) {
        return await deleteComment(commentId, movieId);
    }
    return deletingComment;
}

export function useGetOneComment(initialvalues: { content: string, username: string, likes:[] }, commentId: string | undefined) {
    const [comment, setComment] = useState(initialvalues);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const comment = await getCommentById(commentId);
                setComment(comment);
            } catch (err) {
                if ((err as { message: string }).message == "Resource not found!") {
                    navigate("/404");
                    return;
                }
                return;
            }
        })()
    }, [commentId])

    return {
        comment
    }
}

export function useLikeComment() {
    async function likingComment(commentId: string | undefined,movieId:string | undefined) {
        return await likeComment(commentId,movieId);
    }

    return likingComment;
}

export function useUnlikeComment() {
    async function unlikingComment(commentId: string | undefined,movieId:string | undefined) {
        return await unlikeComment(commentId,movieId);
    }

    return unlikingComment;
}
