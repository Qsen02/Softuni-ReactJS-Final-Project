import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../FormsAndErrors.module.css"

import { useEditForm } from "../../hooks/useForm";
import { useEditGame } from "../../hooks/useGamesjs";

export default function GameEdit({
    setCurGame
}) {
    const [errMessage, setErrMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const { gameId } = useParams();
    let initalValues = {
        name: "",
        category: "",
        year: "",
        image: "",
        creator: "",
        description: ""
    }
    const editGame=useEditGame();
    const { formValues, changeHandler, submitHandler } = useEditForm(initalValues, onEdit, null, gameId);

    async function onEdit() {
        const name = formValues.name;
        const category = formValues.category;
        const year = formValues.year;
        const creator = formValues.creator;
        const description = formValues.description;
        const image = formValues.image;
        try {
            const game = await editGame(gameId, { name, category, year, image, creator, description, _id: gameId });
            navigate(`/catalog/${gameId}`);
            setCurGame(game);
        } catch (err) {
            setIsError(true);
            setErrMessage(JSON.parse(err.message));
            return;
        }
    }

    return (
        <div className={styles.modal}>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>Here you can add game</h3>
                {
                    errMessage instanceof Array
                        ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                        : ""
                }
                {errMessage.name
                    ? <label className={styles.errorMessage}>{errMessage.name}</label>
                    : <label>Name</label>
                }
                <input type="text" name="name" value={formValues.name} onChange={changeHandler} />
                {errMessage.category
                    ? <label className={styles.errorMessage}>{errMessage.category}</label>
                    : <label>Category</label>
                }
                <input type="text" name="category" value={formValues.category} onChange={changeHandler} />
                {errMessage.year
                    ? <label className={styles.errorMessage}>{errMessage.year}</label>
                    : <label>Year</label>
                }
                <input type="number" name="year" value={formValues.year} onChange={changeHandler} />
                {errMessage.image
                    ? <label className={styles.errorMessage}>{errMessage.image}</label>
                    : <label>Image</label>
                }
                <input type="text" name="image" value={formValues.image} onChange={changeHandler} />
                {errMessage.creator
                    ? <label className={styles.errorMessage}>{errMessage.creator}</label>
                    : <label>Creator</label>
                }
                <input type="text" name="creator" value={formValues.creator} onChange={changeHandler} />
                {errMessage.description
                    ? <label className={styles.errorMessage}>{errMessage.description}</label>
                    : <label>Description</label>
                }
                <textarea name="description" value={formValues.description} onChange={changeHandler} />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}