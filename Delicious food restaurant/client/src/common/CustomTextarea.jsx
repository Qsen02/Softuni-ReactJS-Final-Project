import { useField } from "formik"
import styles from "../components/FormsAndErrors.module.css"

export default function CustomTextarea({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            <label>{label}</label>
            <textarea className={meta.error && meta.touched ? styles.error : ""} {...field} {...props} />
            {meta.error && meta.touched ? <p className={styles.errorParagraph}>{meta.error}</p> : ""}
        </>
    )
}