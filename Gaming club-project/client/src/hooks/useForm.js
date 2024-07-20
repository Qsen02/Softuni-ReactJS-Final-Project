import { useEffect, useState } from "react";
import { getGameById } from "../api/gameService";

export function useForm(initalvalues, callback) {
    const [formValues, setFormValues] = useState(initalvalues);

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        callback();
        event.target.reset();
    }

    return {
        formValues,
        changeHandler,
        submitHandler
    }
}

export function useEditForm(initalvalues, callback, gameId) {
    const [formValues, setFormValues] = useState(initalvalues);

    useEffect(() => {
        (async() => {
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
        })()
    }, [])

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        callback();
        event.target.reset();
    }

    return {
        formValues,
        changeHandler,
        submitHandler
    }
}