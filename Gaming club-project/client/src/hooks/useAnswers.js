import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAnswer, deleteAnswer, getAllAnswers } from "../api/answersService";
import { getCommentById } from "../api/commentService";

export function useGetAllAnswers(initialvalues, commentId) {
    const [answers, setAsnwers] = useState(initialvalues);
    const [loading, setLoading] = useState(false);
    const [answersTo, setAnswersTo] = useState({
        likes: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const answers = await getAllAnswers(commentId);
                setAsnwers(answers);
                const comment = await getCommentById(commentId);
                setAnswersTo(comment);
                setLoading(false);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("/404");
                    return;
                }
                return;
            }
        })()
    }, [commentId])

    function setAnswersHandler(value) {
        if (value instanceof Array) {
            setAsnwers(value);
        }
    }
    return {
        answers,
        setAnswersHandler,
        loading,
        answersTo
    }
}

export function useCreateAnswer() {
    async function creatingAnswer(commentId, data) {
        return await createAnswer(commentId, data);
    }

    return creatingAnswer;
}

export function useDeleteAnswer() {
    async function deletingAnswer(answerId, commentId) {
        return await deleteAnswer(answerId, commentId);
    }

    return deletingAnswer;
}