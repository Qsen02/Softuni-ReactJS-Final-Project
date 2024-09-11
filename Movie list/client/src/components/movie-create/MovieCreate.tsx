import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom"
import CustomInput from "../../commons/CustomInput";
import CustomTextarea from "../../commons/CustomTextarea";

import styles from "../FormsAndErrors.module.css"

export default function MovieCreate() {
    const navigate = useNavigate();

    async function onCreate() {

    }

    return (
        <Formik initialValues={{
            title: "",
            genre: "",
            image: "",
            year: 0,
            description: ""
        }}
            onSubmit={onCreate}
        >
            {
                (props) => (
                    <Form className={styles.form}>
                        <h2>Create movie here</h2>
                        <CustomInput label="Title" type="text" name="title" placeholder="Enter movie title..." />
                        <CustomInput label="Genre" type="text" name="genre" placeholder="Enter movie genre..." />
                        <CustomInput label="Image" type="text" name="image" placeholder="Enter valid image URL..." />
                        <CustomInput label="Year" type="number" name="year" placeholder="Enter valid movie year..." />
                        <CustomTextarea label="Description" type="text" name="description" placeholder="Enter good description..." />
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik >
    )
}