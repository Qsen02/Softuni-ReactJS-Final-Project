import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../FormsAndErrors.module.css"

export default function Create() {
    let [errMessage, setErrMessage] = useState({});
    let [isError, setIsError] = useState(false);
    let [formValues, setFormValues] = useState({
        name: "",
        category: "",
        year: "",
        image: "",
        creator: "",
        description: ""
    })
    let navigate = useNavigate();

    function changeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }))
    }

    return (
        <>
            {isError
                ? errMessage instanceof Array
                    ? <div onClick={onClose} className={styles.error}>
                        <p>{errMessage[0]}</p>
                    </div >
                    : <div onClick={onClose} className={styles.error}>
                        <p>{errMessage.username}</p>
                        <p>{errMessage.email}</p>
                        <p>{errMessage.password}</p>
                        <p>{errMessage.repass}</p>
                    </div >
                : ""
            }
            <form method="post" encType="multipart/form-data" className={styles.form}>
                <h3>Here you can add game</h3>
                <label className={errMessage.name ? styles.errorLabel : ""}>Name</label>
                <input type="text" name="name" value={formValues.name} onChange={changeHandler} />
                <label className={errMessage.category ? styles.errorLabel : ""}>Category</label>
                <input type="text" name="category"value={formValues.category} onChange={changeHandler}/>
                <label className={errMessage.year ? styles.errorLabel : ""}>Year</label>
                <input type="number" name="year" value={formValues.year} onChange={changeHandler}/>
                <label>Image</label>
                <div className={styles.uploadWrapper}>
                    <button type="button" id="file-upload-button">Upload</button>
                    <input type="file" name="image" className={styles.upload} id="file-upload" value={formValues.image} onChange={changeHandler}/>
                    <span id="file-upload-text">Choose image</span>
                </div>
                <label className={errMessage.creator ? styles.errorLabel : ""}>Creator</label>
                <input type="text" name="creator" value={formValues.creator} onChange={changeHandler}/>
                <label className={errMessage.description ? styles.errorLabel : ""}>Description</label>
                <textarea name="description" value={formValues.description} onChange={changeHandler}/>
                <button type="submit">Create</button>
            </form>
        </>
    )
}