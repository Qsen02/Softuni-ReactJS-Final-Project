import { useEffect, useState } from "react";

export function useForm(initalvalues, callback, initializedform = false) {
    const [formValues, setFormValues] = useState(initalvalues);

    function changeHandler(event) {
        setFormValues(oldValues => ({...oldValues, [event.target.name]: event.target.value }));
    }
    useEffect(() => {
        if (initializedform) {
            setFormValues(initalvalues);
        }
    }, [initalvalues, initializedform])

    function submitHandler(event) {
        event.preventDefault();
        callback();
    }

    return {
        formValues,
        changeHandler,
        submitHandler
    }
}