import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAnswerById } from "../api/answerService"

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

export function useGetOneAnswer(initialvalues: AnswerType, answerId: string) {
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

    return{
        answer
    }
}