import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAnswers } from "../api/answersService";

export function useGetAllAnswers(initialvalues, commentId) {
    const [answers, setAsnwers] = useState(initialvalues);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const answers = await getAllAnswers(commentId);
                setAsnwers(answers);
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
        loading
    }
}