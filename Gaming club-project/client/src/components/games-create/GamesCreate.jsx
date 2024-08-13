import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../FormsAndErrors.module.css"

import { useForm } from "../../hooks/useForm";
import { useCreateGame } from "../../hooks/useGames.js";

export default function Create() {
    const [errMessage, setErrMessage] = useState({});
    const initalValues = {
        name: "",
        category: "",
        year: "",
        image: "",
        creator: "",
        description: ""
    }
    const navigate = useNavigate();
    const createGame = useCreateGame();
    const { formValues, changeHandler, submitHandler } = useForm(initalValues, onCreate);

    async function onCreate() {
        let name = formValues.name;
        let category = formValues.category;
        let year = formValues.year;
        let creator = formValues.creator;
        let description = formValues.description;
        let image = formValues.image;
        try {
            if (!name || !category || !year || !creator || !description || !image) {
                throw new Error("All fields required!");
            }
            await createGame({ name, category, year, image, creator, description });
            navigate("/catalog");
        } catch (err) {
            if (err.message === "All fields required!") {
                setErrMessage(err.message);
                return;
            }
            setErrMessage(JSON.parse(err.message));
            return;
        }
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <h3>Here you can add game</h3>
            {errMessage instanceof Array
                ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                : ""
            }
            {typeof (errMessage) == "string"
                ? <label className={styles.errorMessage}>{errMessage}</label>
                : ""
            }
            {errMessage.name
                ? <label className={styles.errorMessage}>{errMessage.name}</label>
                : <label>Name</label>
            }
            <input type="text" name="name" value={formValues.name} onChange={changeHandler} placeholder="Enter game name..." />
            {errMessage.category
                ? <label className={styles.errorMessage}>{errMessage.category}</label>
                : <label>Category</label>
            }
            <input type="text" name="category" value={formValues.category} onChange={changeHandler} placeholder="Enter game category..." />
            {errMessage.year
                ? <label className={styles.errorMessage}>{errMessage.year}</label>
                : <label>Year</label>
            }
            <input type="number" name="year" value={formValues.year} onChange={changeHandler} placeholder="Enter game year..." />
            {errMessage.image
                ? <label className={styles.errorMessage}>{errMessage.image}</label>
                : <label>Image</label>
            }
            <input type="text" name="image" value={formValues.image} onChange={changeHandler} placeholder="Enter valid URL of the image..." />
            {errMessage.creator
                ? <label className={styles.errorMessage}>{errMessage.creator}</label>
                : <label>Creator</label>
            }
            <input type="text" name="creator" value={formValues.creator} onChange={changeHandler} placeholder="Enter creator of the game..." />
            {errMessage.description
                ? <label className={styles.errorMessage}>{errMessage.description}</label>
                : <label>Description</label>
            }
            <textarea name="description" value={formValues.description} onChange={changeHandler} placeholder="Enter good description..." />
            <div className={styles.buttons}>
                <button type="submit">Create</button>
            </div>

        </form>
    )
}