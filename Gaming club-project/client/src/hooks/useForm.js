import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getGameById } from "../api/gameService";
import { getCommentById } from "../api/commentService";

export function useForm(initalvalues, callback, path, commentId, gameId) {
    const [formValues, setFormValues] = useState(initalvalues);
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }));
    }

    if (commentId || gameId) {
        useEffect(() => {
            (async() => {
                if (commentId) {
                    const comment = await getCommentById(commentId);
                    setFormValues(oldValues => ({
                        ...oldValues,
                        content: comment.content
                    }))
                } else {
                    const game = await getGameById(gameId);
                    setFormValues(oldValues => ({
                        ...oldValues,
                        name: game.name,
                        category: game.category,
                        year: game.year,
                        image: game.image,
                        creator: game.creator,
                        description: game.description
                    }))
                }
            })()
        }, [])
    }

    function submitHandler(event) {
        event.preventDefault();
        callback();
        event.target.reset();
        if (path && typeof(path) === "string") {
            navigate(path);
        }
    }

    return {
        formValues,
        changeHandler,
        submitHandler
    }
}