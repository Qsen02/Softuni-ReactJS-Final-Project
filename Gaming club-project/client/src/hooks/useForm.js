import { useState } from "react";

export function useForm(initalvalues, callback) {
    const [formValues, setFormValues] = useState(initalvalues);

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }));
    }

    async function onSubmitHandler(event) {
        event.preventDefault();
        callback();
        event.target.reset();
    }

    return {
        formValues,
        changeHandler,
        onSubmitHandler
    }
}