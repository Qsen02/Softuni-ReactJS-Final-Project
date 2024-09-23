import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom"
import CustomInput from "../../commons/CustomInput";
import CustomTextarea from "../../commons/CustomTextarea";

import styles from "../FormsAndErrors.module.css"
import { useCreateMovie } from "../../hooks/useMovies";
import { useState } from "react";
import { createMovieSchema } from "../../schemas";

export default function MovieCreate() {
    const navigate = useNavigate();
    const createMovie = useCreateMovie();
    const [errMessage, setErrMessage] = useState<string | [string]>("");

    type valueType = {
        title: string,
        genre: string,
        image: string,
        year: number,
        description: string
    }

    async function onCreate(values: valueType, actions: FormikHelpers<valueType>) {
        const title = values.title;
        const genre = values.genre;
        const image = values.image;
        const year = values.year;
        const description = values.description;
        try {
            await createMovie({title,genre,image,year,description})
            actions.resetForm();
            navigate("/catalog");
        } catch (err) {
            if (((err as { message: string }).message).includes("[")) {
                setErrMessage(JSON.parse((err as { message: string }).message));
                return;
            }
            setErrMessage((err as { message: string }).message);
            return;
        }
    }

    return (
        <Formik initialValues={{
            title: "",
            genre: "",
            image: "",
            year: 0,
            description: ""
        }}
            validationSchema={createMovieSchema}
            onSubmit={onCreate}
        >
            {
                (props) => (
                    <Form className={styles.form}>
                        <h2>Create movie here</h2>
                        {errMessage instanceof Array
                            ? <p className={styles.error}>{errMessage[0]}</p>
                            : <p className={styles.error}>{errMessage}</p>
                        }
                        <CustomInput label="Title" type="text" name="title" placeholder="Enter movie title..." />
                        <CustomInput label="Genre" type="text" name="genre" placeholder="Enter movie genre..." />
                        <CustomInput label="Image" type="text" name="image" placeholder="Enter valid URL..."/>
                        <CustomInput label="Year" type="number" name="year" placeholder="Enter valid movie year..." />
                        <CustomTextarea label="Description" type="text" name="description" placeholder="Enter good description..." />
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik >
    )
}