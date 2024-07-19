import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../FormsAndErrors.module.css"
import { createGame } from "../../api/gameService";

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

    function onClose() {
        setIsError(false);
    }

    async function onCreate(event) {
        event.preventDefault();
        let name = formValues.name;
        let category = formValues.category;
        let year = formValues.year;
        let creator = formValues.creator;
        let description = formValues.description;
        let image = formValues.image;
        try {
            await createGame({ name, category, year, image, creator, description });
            navigate("/catalog");
        } catch (err) {
            setIsError(true);
            setErrMessage(JSON.parse(err.message));
            return;
        }
    }

    return (
        <>
            {isError
                ? errMessage instanceof Array
                    ? <div onClick={onClose} className={styles.error}>
                        <p>{errMessage[0]}</p>
                    </div >
                    : <div onClick={onClose} className={styles.error}>
                        <p>{errMessage.name}</p>
                        <p>{errMessage.category}</p>
                        <p>{errMessage.year}</p>
                        <p>{errMessage.image}</p>
                        <p>{errMessage.creator}</p>
                        <p>{errMessage.description}</p>
                    </div >
                : ""
            }
            <form encType="multipart/form-data" onSubmit={onCreate} className={styles.form}>
                <h3>Here you can add game</h3>
                <label className={errMessage.name ? styles.errorLabel : ""}>Name</label>
                <input type="text" name="name" value={formValues.name} onChange={changeHandler} placeholder="Enter game name..."/>
                <label className={errMessage.category ? styles.errorLabel : ""}>Category</label>
                <input type="text" name="category" value={formValues.category} onChange={changeHandler} placeholder="Enter game category..."/>
                <label className={errMessage.year ? styles.errorLabel : ""}>Year</label>
                <input type="number" name="year" value={formValues.year} onChange={changeHandler} placeholder="Enter game year..."/>
                <label className={errMessage.image ? styles.errorLabel : ""}>Image</label>
                <input type="text" name="image" value={formValues.image} onChange={changeHandler} placeholder="Enter valid URL of the image..."/>
                <label className={errMessage.creator ? styles.errorLabel : ""}>Creator</label>
                <input type="text" name="creator" value={formValues.creator} onChange={changeHandler} placeholder="Enter creator of the game..."/>
                <label className={errMessage.description ? styles.errorLabel : ""}>Description</label>
                <textarea name="description" value={formValues.description} onChange={changeHandler} placeholder="Enter good description..."/>
                <button type="submit">Create</button>
            </form>
        </>
    )
}