import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../FormsAndErrors.module.css"

import { useCreateGame } from "../../hooks/useGames.js";
import { Form, Formik } from "formik";
import { gameSchema } from "../../schemas/index.js";

import CustomInput from "../../common/CustomInput.jsx";
import CustomTextarea from "../../common/CustomTextarea.jsx";
import { useUserContext } from "../../context/userContext.jsx";

export default function Create() {
    const [errMessage, setErrMessage] = useState({});
    const navigate = useNavigate();
    const createGame = useCreateGame();
    const [clicked, setClicked] = useState(false);
    const {clearUserHandler}=useUserContext();

    async function onCreate(values,actions) {
        const name = values.name;
        const category = values.category;
        const year = values.year;
        const creator = values.creator;
        const description = values.description;
        const image = values.image;
        try {
            setClicked(true);
            await createGame({ name, category, year, image, creator, description });
            actions.resetForm();
            setClicked(false);
            navigate("/catalog");
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            if(err.message.includes("[")){
                setErrMessage(JSON.parse(err.message));
                return;
            }
            setErrMessage(err.message);
            return;
        }
    }

    return (
        <Formik initialValues={{ name: "", year: "", category: "", creator: "", description: "", image: "" }} validationSchema={gameSchema} onSubmit={onCreate}>
            {
                (props) => (
                    <Form className={styles.form}>
                        <h3>Here you can add game</h3>
                        {errMessage instanceof Array
                            ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                            : ""
                        }
                        {typeof (errMessage) == "string"
                            ? <label className={styles.errorMessage}>{errMessage}</label>
                            : ""
                        }
                        <CustomInput label="Name" type="text" name="name"  placeholder="Enter game name..." />
                        <CustomInput label="Category" type="text" name="category"  placeholder="Enter game category..." />
                        <CustomInput  label="Year" type="number" name="year"  placeholder="Enter game year..." />
                        <CustomInput label="Image" type="text" name="image"  placeholder="Enter valid URL of the image..." />
                        <CustomInput label="Creator" type="text" name="creator"  placeholder="Enter creator of the game..." />
                        <CustomTextarea label="Description" type="text" name="description"  placeholder="Enter good description..." />
                        <div className={styles.buttons}>
                            <button disabled={clicked ? true : false} type="submit">Create</button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}