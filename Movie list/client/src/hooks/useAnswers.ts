import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAnswer, deleteAnswer, editAnswer, getAnswerById, likeAnswer, unlikeAnswer } from "../api/answerService"

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

export function useGetOneAnswer(initialvalues: AnswerType, answerId: string|undefined) {
    const [answer, setAnswer] = useState<AnswerType>(initialvalues);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const answer = await getAnswerById(answerId);
                setAnswer(answer);
            } catch (err) {
                if ((err as { message: string }).message == "Resource not found!") {
                    navigate("/404");
                    return;
                }
                return;
            }
        })()
    }, [answerId])

    return {
        answer,setAnswer
    }
}

export function useCreateAnswer() {
    async function creatingAnswer(data: {}, commentId: string | undefined) {
        return await createAnswer(data, commentId)
    }

    return creatingAnswer;
}

export function useDeleteAnswer() {
    async function deletingAnswer(answerId: string | undefined, commentId: string | undefined) {
        return await deleteAnswer(answerId, commentId)
    }

    return deletingAnswer;
}

export function useEditAnswer() {
    async function editingAnswer(answerId: string | undefined, commentId: string | undefined,data:{}) {
        return await editAnswer(answerId, commentId,data)
    }

    return editingAnswer;
}

export function useLikeAnswer(){
    async function likingAnswer(answerId:string,commentId:string |undefined){
        return await likeAnswer(answerId,commentId);
    }
    return likingAnswer;
}

export function useUnlikeAnswer(){
    async function unlikingAnswer(answerId:string,commentId:string |undefined){
        return await unlikeAnswer(answerId,commentId);
    }
    return unlikingAnswer;
}