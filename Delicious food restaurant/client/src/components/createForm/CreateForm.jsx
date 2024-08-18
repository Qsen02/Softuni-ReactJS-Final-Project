import { Form, Formik } from "formik"

import CustomInput from "../../common/CustomInput"
import CustomTextarea from "../../common/CustomTextarea"

import { createSchema } from "../../schemas"

import styles from "../FormsAndErrors.module.css"

export default function CreateForm() {
    return (
            <Formik
            initialValues={{ title: "", price: "", category: "", image: "", description: "" }}
            validationSchema={createSchema}
            >
                {
                    (props) => (
                        <Form className={styles.form}>
                            <h2>Create dish here</h2>
                            <CustomInput label="Title" type="text" name="title" placeholder="Enter title..." />
                            <CustomInput label="Price" type="number" name="price" placeholder="Enter price number..." />
                            <CustomInput label="Category" type="text" name="category" placeholder="Enter food category..." />
                            <CustomInput label="Image" type="text" name="image" placeholder="Enter image url..." />
                            <CustomTextarea label="Description" type="text" name="description" placeholder="Enter description..." />
                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
    )
}