import { Form, Formik } from "formik"

import CustomInput from "../../common/CustomInput"
import CustomTextarea from "../../common/CustomTextarea"

import { createSchema } from "../../schemas"

import styles from "./EditDish.module.css"

import { useEditDish, useGetOneDish } from "../../hooks/useDishes"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useUserContext } from "../../context/UserContext"

export default function EditDish({
    setDish
}) {
    const editDish = useEditDish();
    const navigate = useNavigate();
    const {clearUserHandler}=useUserContext();
    const [errMessage, setErrMessage] = useState("");
    const [isClicked,setIsClicked]=useState(false);
    const { dishId } = useParams();
    const { dish } = useGetOneDish({ title: "", price: "", category: "", image: "", description: "" }, dishId);

    async function onCreate(values, action) {
        const title = values.title;
        const price = values.price;
        const category = values.category;
        const image = values.image;
        const description = values.description;
        try {
            setIsClicked(true);
            const updatedDish = await editDish(dishId, { title, price, category, image, description });
            action.resetForm();
            setDish(updatedDish);
            setIsClicked(false);
            navigate(`/catalog/${dishId}`);
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

    function onCancel(){
        setIsClicked(true);
        navigate(`/catalog/${dishId}`);
        setIsClicked(false);
    }

    return (
        <Formik
            initialValues={{ title: dish.title, price: dish.price, category: dish.category, image: dish.image, description: dish.description }}
            validationSchema={createSchema}
            onSubmit={onCreate}
            enableReinitialize={true}
        >
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Edit dish here</h2>
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
                            <button disabled={isClicked?true:false} type="submit">Edit</button>
                            <button disabled={isClicked?true:false} onClick={onCancel}>Cancel</button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}