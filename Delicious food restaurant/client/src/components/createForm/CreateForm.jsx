import { Form, Formik } from "formik"

import CustomInput from "../../common/CustomInput"
import CustomTextarea from "../../common/CustomTextarea"

import { createSchema } from "../../schemas"

import styles from "../FormsAndErrors.module.css"

import { useCreateDish, useUnlike } from "../../hooks/useDishes"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUserContext } from "../../context/UserContext"

export default function CreateForm() {
    const createDish = useCreateDish();
    const {clearUserHandler}=useUserContext();
    const navigate = useNavigate();
    const [isClicked,setIsClicked]=useState(false);
    const [errMessage, setErrMessage] = useState("");

    async function onCreate(values, action) {
        const title = values.title;
        const price = values.price;
        const category = values.category;
        const image = values.image;
        const description = values.description;
        try {
            setIsClicked(true);
            await createDish({ title, price, category, image, description });
            action.resetForm();
            setIsClicked(false);
            navigate("/catalog");
        } catch (err) {
            if (err.message == "You don't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            if (err.message.includes("[")) {
                setErrMessage(JSON.parse(err.message));
                return;
            }
            setErrMessage(err.message);
            return;
        }
    }

    return (
        <Formik
            initialValues={{ title: "", price: "", category: "", image: "", description: "" }}
            validationSchema={createSchema}
            onSubmit={onCreate}
        >
            {
                (props) => (
                    <Form className={styles.form}>
                        <h2>Create dish here</h2>
                        {
                            errMessage instanceof Array
                                ? <p className={styles.errorDontMatch}>{errMessage[0]}</p>
                                : <p className={styles.errorDontMatch}>{errMessage}</p>
                        }
                        <CustomInput label="Title" type="text" name="title" placeholder="Enter title..." />
                        <CustomInput label="Price" type="number" name="price" placeholder="Enter price number..." />
                        <CustomInput label="Category" type="text" name="category" placeholder="Enter food category..." />
                        <CustomInput label="Image" type="text" name="image" placeholder="Enter image url..." />
                        <CustomTextarea label="Description" type="text" name="description" placeholder="Enter description..." />
                        <button disabled={isClicked?true:false} type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}