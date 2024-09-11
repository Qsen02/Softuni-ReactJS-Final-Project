import { useField } from "formik";

import styles from "../components/FormsAndErrors.module.css";

type CustomInputProps = {
    label?: string,
    type:string,
    name:string,
    placeholder?:string
}

export default function CustomTextarea({ label, ...props }: CustomInputProps) {
    const [field, meta] = useField(props);
    return (
        <>
            <label>{label}</label>
            <textarea {...field} {...props}/>
            {
                meta.touched && meta.error ? <p className={styles.error}>{meta.error}</p> : ""
            }
        </>
    )
}