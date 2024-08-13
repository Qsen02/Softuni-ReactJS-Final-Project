import { useField } from "formik"
import styles from "../components/FormsAndErrors.module.css"

export default function CustomInput({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            {meta.touched && meta.error
                ? <label className={styles.errorMessage}>{meta.error}</label>
                : <label>{label}</label>
            }
            <input {...field} {...props} />
        </>
    )
}