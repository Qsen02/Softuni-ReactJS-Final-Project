import { useField } from "formik"
import { HTMLAttributes } from "react";

type CustomInputProps = {
    label: string,
    props: [string]
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
    const [field, meta] = useField(props);
    return (
        <>
            <label>{label}</label>
            <input {...field} {...props} />
            {
                meta.touched && meta.error ? <p>{meta.error}</p> : ""
            }
        </>
    )
}