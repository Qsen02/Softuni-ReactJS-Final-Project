import { useField } from "formik"

type CustomInputProps = {
    label?: string,
    type:string,
    name:string,
    placeholder?:string
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