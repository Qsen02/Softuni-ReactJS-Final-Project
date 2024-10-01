import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";

import { useEditAnswer, useGetOneAnswer } from "../../../hooks/useAnswers"

import CustomInput from "../../../commons/CustomInput";

import styles from "../../FormsAndErrors.module.css"

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
} | null

type AnswerEditProps={
    curUser:User|undefined
}

export default function AnswerEdit({
    curUser
}:AnswerEditProps) {
    const initialvalues = {
        _id: "",
        username: "",
        content: "",
        ownerId: {
            _id: "",
            username: "",
            email: "",
            isAdmin: false,
            accessToken: "",
            profileImage: ""
        },
        likes: []
    }
    const { movieId, commentId, answerId } = useParams();
    const { answer } = useGetOneAnswer(initialvalues, answerId);
    const [errMessage, setErrMessage] = useState("");
    const editAnswer = useEditAnswer();
    const navigate = useNavigate();

    async function onEdit(values: { content: string }, actions: FormikHelpers<{ content: string }>) {
        const content = values.content;
        try {
            if (!content) {
                throw new Error("Please, fill the field!");
            }
            await editAnswer(answerId, commentId, { username: curUser?.username, content });
            navigate(`/catalog/${movieId}/comment/${commentId}/answers`);
        } catch (err) {
            setErrMessage((err as { message: string }).message);
            return;
        }

    }

    function onCancel(){
        try{
            navigate(`/catalog/${movieId}/comment/${commentId}/answers`);
        }catch(err){
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    return (
        <Formik initialValues={{ content: answer.content }} enableReinitialize={true} onSubmit={onEdit}>
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Edit answer</h2>
                            {errMessage ? <p className={styles.error}>{errMessage}</p> : ""}
                            <CustomInput type="text" name="content" />
                            <button type="submit" className={styles.editFormButtons}>Edit</button>
                            <button onClick={onCancel} className={styles.editFormButtons}>Cancel</button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}