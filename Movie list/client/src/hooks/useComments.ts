import { useEffect, useState } from "react";
import { createComment, deleteComment, getCommentById, likeComment, unlikeComment } from "../api/commentService";
import { useNavigate } from "react-router-dom";

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
}

type AnswerType = {
    _id:string
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

export function useGetOneComment(initialvalues: CommentType, commentId: string | undefined) {
    const [comment, setComment] = useState<CommentType>(initialvalues);
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
