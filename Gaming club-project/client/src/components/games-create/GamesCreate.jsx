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
            <form encType="multipart/form-data" onSubmit={onCreate} className={styles.form}>
                <h3>Here you can add game</h3>
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.name
                        ? <label className={styles.errorMessage}>{errMessage.name}</label>
                        : <label>Name</label>
                }
                <input type="text" name="name" value={formValues.name} onChange={changeHandler} placeholder="Enter game name..." />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.category
                        ? <label className={styles.errorMessage}>{errMessage.category}</label>
                        : <label>Category</label>
                }
                <input type="text" name="category" value={formValues.category} onChange={changeHandler} placeholder="Enter game category..." />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.year
                        ? <label className={styles.errorMessage}>{errMessage.year}</label>
                        : <label>Year</label>
                }
                <input type="number" name="year" value={formValues.year} onChange={changeHandler} placeholder="Enter game year..." />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.image
                        ? <label className={styles.errorMessage}>{errMessage.image}</label>
                        : <label>Image</label>
                }
                <input type="text" name="image" value={formValues.image} onChange={changeHandler} placeholder="Enter valid URL of the image..." />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.creator
                        ? <label className={styles.errorMessage}>{errMessage.creator}</label>
                        : <label>Creator</label>
                }
                <input type="text" name="creator" value={formValues.creator} onChange={changeHandler} placeholder="Enter creator of the game..." />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.description
                        ? <label className={styles.errorMessage}>{errMessage.description}</label>
                        : <label>Description</label>
                }
                <textarea name="description" value={formValues.description} onChange={changeHandler} placeholder="Enter good description..." />
                <button type="submit">Create</button>
            </form>
    )
}