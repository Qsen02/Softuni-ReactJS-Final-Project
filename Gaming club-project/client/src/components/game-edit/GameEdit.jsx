import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../FormsAndErrors.module.css"
import { editGame, getGameById } from "../../api/gameService";

export default function GameEdit() {
    const [errMessage, setErrMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        category: "",
        year: "",
        image: "",
        creator: "",
        description: ""
    })
    const navigate = useNavigate();
    const { gameId } = useParams();

    function changeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }))
    }

    function onClose() {
        setIsError(false);
    }

    useEffect(() => {
        (async () => {
            let game = await getGameById(gameId);
            setFormValues(oldValues => ({
                ...oldValues,
                name: game.name,
                category: game.category,
                year: game.year,
                image: game.image,
                creator: game.creator,
                description: game.description
            }))
        })()
    }, [])

    async function onEdit(event) {
        event.preventDefault();
        let name = formValues.name;
        let category = formValues.category;
        let year = formValues.year;
        let creator = formValues.creator;
        let description = formValues.description;
        let image = formValues.image;
        try {
            await editGame(gameId, { name, category, year, image, creator, description, _id: gameId });
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            setIsError(true);
            setErrMessage(JSON.parse(err.message));
            return;
        }
    }

    return (
        <>
            <div className={styles.modal}>
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
                <form encType="multipart/form-data" onSubmit={onEdit} className={styles.form}>
                    <h3>Here you can add game</h3>
                    <label className={errMessage.name ? styles.errorLabel : ""}>Name</label>
                    <input type="text" name="name" value={formValues.name} onChange={changeHandler} />
                    <label className={errMessage.category ? styles.errorLabel : ""}>Category</label>
                    <input type="text" name="category" value={formValues.category} onChange={changeHandler} />
                    <label className={errMessage.year ? styles.errorLabel : ""}>Year</label>
                    <input type="number" name="year" value={formValues.year} onChange={changeHandler} />
                    <label className={errMessage.image ? styles.errorLabel : ""}>Image</label>
                    <input type="text" name="image" value={formValues.image} onChange={changeHandler} />
                    <label className={errMessage.creator ? styles.errorLabel : ""}>Creator</label>
                    <input type="text" name="creator" value={formValues.creator} onChange={changeHandler} />
                    <label className={errMessage.description ? styles.errorLabel : ""}>Description</label>
                    <textarea name="description" value={formValues.description} onChange={changeHandler} />
                    <button type="submit">Edit</button>
                </form>
            </div>
        </>
    )
}