import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import styles from "../FormsAndErrors.module.css";

import CustomInput from "../../commons/CustomInput";
import CustomTextarea from "../../commons/CustomTextarea";
import { useEditMovie } from "../../hooks/useMovies";
import { createMovieSchema } from "../../schemas";

type MovieEditProps = {
    setMovie: React.Dispatch<React.SetStateAction<{}>>
    curMovie: {}
}

export default function MovieEdit({
    setMovie, curMovie
}:MovieEditProps) {
    const editMovie = useEditMovie();
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState<string | [string]>("");

    type valueType = {
        title: string,
        genre: string,
        image: string,
        year: number,
        description: string
    }

    async function onEdit(values: valueType, actions: FormikHelpers<valueType>) {
        const title = values.title;
        const genre = values.genre;
        const image = values.image;
        const year = values.year;
        const description = values.description;
        try {
            const movie = await editMovie(movieId, { title, genre, image, year, description });
            actions.resetForm();
            setMovie(movie);
            navigate(`/catalog/${movieId}`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            if (((err as { message: string }).message).includes("[")) {
                setErrMessage(JSON.parse((err as { message: string }).message));
                return;
            }
            setErrMessage((err as { message: string }).message);
            return;
        }
    }

    function onCancel() {
        try {
            navigate(`/catalog/${movieId}`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }

    return (
        <Formik initialValues={{
            title: (curMovie as { title: string }).title,
            genre: (curMovie as { genre: string }).genre,
            image: (curMovie as { image: string }).image,
            year: (curMovie as { year: number }).year,
            description: (curMovie as { description: string }).description
        }}
            enableReinitialize={true}
            validationSchema={createMovieSchema}
            onSubmit={onEdit}
        >
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Edit movie {(curMovie as { title: string }).title}</h2>
                            {errMessage instanceof Array
                                ? <p className={styles.error}>{errMessage[0]}</p>
                                : <p className={styles.error}>{errMessage}</p>
                            }
                            <CustomInput label="Title" type="text" name="title" placeholder="Enter movie title..." />
                            <CustomInput label="Genre" type="text" name="genre" placeholder="Enter movie genre..." />
                            <CustomInput label="Image" type="text" name="image" placeholder="Enter valid image URL..." />
                            <CustomInput label="Year" type="number" name="year" placeholder="Enter valid movie year..." />
                            <CustomTextarea label="Description" type="text" name="description" placeholder="Enter good description..." />
                            <button type="submit" className={styles.editFormButtons}>Edit</button>
                            <button className={styles.editFormButtons} onClick={onCancel}>Cancel</button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}