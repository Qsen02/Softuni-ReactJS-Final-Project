import { Form, Formik } from "formik";
import styles from "../FormsAndErrors.module.css";
import CustomInput from "../../commons/CustomInput";
import CustomTextarea from "../../commons/CustomTextarea";
import { useState } from "react";
import { useEditMovie } from "../../hooks/useMovies";
import { createMovieSchema } from "../../schemas";

export default function MovieEdit() {
    const editMovie = useEditMovie();
    const [errMessage, setErrMessage] = useState<string | [string]>("");

    async function onEdit() {

    }

    return (
        <Formik initialValues={{
            title: "",
            genre: "",
            image: "",
            year: 0,
            description: ""
        }}
            enableReinitialize={true}
            validationSchema={createMovieSchema}
            onSubmit={onEdit}
        >
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Edit movie here</h2>
                            {errMessage instanceof Array
                                ? <p className={styles.error}>{errMessage[0]}</p>
                                : <p className={styles.error}>{errMessage}</p>
                            }
                            <CustomInput label="Title" type="text" name="title" placeholder="Enter movie title..." />
                            <CustomInput label="Genre" type="text" name="genre" placeholder="Enter movie genre..." />
                            <CustomInput label="Image" type="text" name="image" placeholder="Enter valid image URL..." />
                            <CustomInput label="Year" type="number" name="year" placeholder="Enter valid movie year..." />
                            <CustomTextarea label="Description" type="text" name="description" placeholder="Enter good description..." />
                            <button type="submit">Edit</button>
                            <button>Cancel</button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}